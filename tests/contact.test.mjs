import assert from 'node:assert/strict'
import { afterEach, beforeEach, mock, test } from 'node:test'
import nodemailer from 'nodemailer'
import { POST } from '../app/api/contact/route.ts'

const valid = { name: 'Test Customer', email: 'customer@example.com', eventType: 'birthday', date: '2026-10-15', message: 'Please share availability for our event.' }
const envKeys = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'SMTP_FROM', 'EMAIL_TO']
let previous
let sendMail
let createTransport
let close
beforeEach(() => {
  previous = Object.fromEntries(envKeys.map(key => [key, process.env[key]]))
  for (const key of envKeys) delete process.env[key]
  Object.assign(process.env, { SMTP_USER: 'info@parkandplayarcade.com', SMTP_PASS: 'test-only', EMAIL_TO: 'info@parkandplayarcade.com' })
  sendMail = mock.fn(async () => ({ messageId: 'test-only' }))
  close = mock.fn()
  createTransport = mock.method(nodemailer, 'createTransport', () => ({ sendMail, close }))
  mock.method(console, 'error', () => {})
})
afterEach(() => {
  mock.restoreAll()
  for (const key of envKeys) {
    if (previous[key] === undefined) delete process.env[key]
    else process.env[key] = previous[key]
  }
})
const request = (body, type = 'application/json') => new Request('https://parkandplayarcade.com/api/contact', {
  method: 'POST', headers: { 'content-type': type }, body: typeof body === 'string' ? body : JSON.stringify(body),
})

test('valid bookings use the business sender, customer Reply-To, and fixed recipient', async () => {
  assert.equal((await POST(request({ ...valid, to: 'attacker@example.com', from: 'attacker@example.com' }))).status, 200)
  const mail = sendMail.mock.calls[0].arguments[0]
  assert.deepEqual(mail.from, { name: 'Park & Play Arcade', address: 'info@parkandplayarcade.com' })
  assert.deepEqual(mail.replyTo, { name: valid.name, address: valid.email })
  assert.deepEqual(mail.to, ['info@parkandplayarcade.com'])
  assert.equal(createTransport.mock.calls[0].arguments[0].service, 'gmail')
  assert.equal(close.mock.callCount(), 1)
})
test('configured external SMTP requires encryption and verified sender', async () => {
  Object.assign(process.env, { SMTP_HOST: 'mail.smtp2go.com', SMTP_PORT: '587', SMTP_USER: 'smtp-account', SMTP_FROM: 'info@parkandplayarcade.com' })
  assert.equal((await POST(request(valid))).status, 200)
  const config = createTransport.mock.calls[0].arguments[0]
  assert.equal(config.requireTLS, true)
  assert.equal(config.secure, false)
  assert.equal(config.disableFileAccess, true)
  assert.equal(config.disableUrlAccess, true)
})
test('port 465 uses implicit TLS', async () => {
  Object.assign(process.env, { SMTP_HOST: 'mail.smtp2go.com', SMTP_PORT: '465' })
  assert.equal((await POST(request(valid))).status, 200)
  assert.equal(createTransport.mock.calls[0].arguments[0].secure, true)
})
for (const [name, change] of [
  ['header injection', { name: 'Name\r\nBcc: attacker@example.com' }],
  ['invalid email', { email: 'invalid' }],
  ['invalid calendar date', { date: '2026-02-30' }],
  ['unsupported event type', { eventType: 'injected' }],
  ['oversized message', { message: 'x'.repeat(5001) }],
]) {
  test(`rejects ${name} before sending`, async () => {
    assert.equal((await POST(request({ ...valid, ...change }))).status, 400)
    assert.equal(createTransport.mock.callCount(), 0)
  })
}
test('malformed JSON and non-JSON requests cannot send email', async () => {
  assert.equal((await POST(request('{broken'))).status, 400)
  assert.equal((await POST(request(valid, 'text/plain'))).status, 415)
  assert.equal(sendMail.mock.callCount(), 0)
})
test('oversized body without Content-Length is rejected', async () => {
  assert.equal((await POST(request({ ...valid, message: 'x'.repeat(17000) }))).status, 413)
  assert.equal(sendMail.mock.callCount(), 0)
})
test('SMTP errors do not expose credentials or claim delivery succeeded', async () => {
  sendMail.mock.mockImplementation(async () => { throw new Error('private SMTP credential and server detail') })
  const response = await POST(request(valid))
  assert.equal(response.status, 503)
  const body = await response.json()
  assert.equal(body.success, false)
  assert.doesNotMatch(body.error, /private|credential|server detail/)
  assert.equal(close.mock.callCount(), 1)
})
test('missing server configuration prevents delivery', async () => {
  delete process.env.SMTP_PASS
  assert.equal((await POST(request(valid))).status, 503)
  assert.equal(createTransport.mock.callCount(), 0)
})
