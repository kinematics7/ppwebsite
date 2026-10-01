import nodemailer from 'nodemailer'
import { z } from 'zod'

export const runtime = 'nodejs'

const MAX_BODY_BYTES = 16 * 1024
const singleLine = z.string().trim().regex(/^[^\r\n\u0000-\u001f\u007f]+$/)
const emailAddress = singleLine.email().max(254)
const bookingSchema = z.object({
  name: singleLine.min(2).max(100),
  email: emailAddress,
  eventType: z.enum(['birthday', 'corporate', 'wedding', 'festival', 'other']),
  date: z.string().date(),
  message: z.string().trim().min(10).max(5000),
})

export async function POST(request: Request) {
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
    return Response.json({ success: false, error: 'Please submit the booking form as JSON.' }, { status: 415 })
  }
  // Count streamed bytes too: Content-Length can be missing or inaccurate.
  const reader = request.body?.getReader()
  if (!reader) {
    return Response.json({ success: false, error: 'Please complete the booking form.' }, { status: 400 })
  }
  let data: unknown
  try {
    const chunks: Uint8Array[] = []
    let length = 0
    while (true) {
      const { value, done } = await reader.read()
      if (done) break
      length += value.byteLength
      if (length > MAX_BODY_BYTES) {
        await reader.cancel()
        return Response.json({ success: false, error: 'Your message is too long.' }, { status: 413 })
      }
      chunks.push(value)
    }
    data = JSON.parse(Buffer.concat(chunks).toString('utf8'))
  } catch {
    return Response.json({ success: false, error: 'Please complete the booking form.' }, { status: 400 })
  } finally {
    reader.releaseLock()
  }

  const result = bookingSchema.safeParse(data)
  if (!result.success) {
    return Response.json({ success: false, error: 'Please check your name, email, event date, and message.' }, { status: 400 })
  }
  const from = emailAddress.safeParse(process.env.SMTP_FROM || process.env.SMTP_USER)
  const recipients = z.array(emailAddress).min(1).max(5).safeParse(process.env.EMAIL_TO?.split(','))
  const port = Number(process.env.SMTP_PORT || '587')
  if (!from.success || !recipients.success || !process.env.SMTP_USER || !process.env.SMTP_PASS ||
      !Number.isInteger(port) || port < 1 || port > 65535) {
    console.error('Booking email configuration is incomplete.')
    return Response.json({ success: false, error: 'We could not send your request. Please email info@parkandplayarcade.com or call us.' }, { status: 503 })
  }
  // Keep the current Gmail transport until a verified replacement is configured.
  const transporter = nodemailer.createTransport({
    ...(process.env.SMTP_HOST
      ? { host: process.env.SMTP_HOST, port, secure: port === 465, requireTLS: port !== 465 }
      : { service: 'gmail' }),
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
    disableFileAccess: true,
    disableUrlAccess: true,
  })
  const { name, email, eventType, date, message } = result.data
  try {
    await transporter.sendMail({
      from: { name: 'Park & Play Arcade', address: from.data },
      replyTo: { name, address: email },
      to: recipients.data,
      subject: `New booking request from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nEvent: ${eventType}\nDate: ${date}\n\n${message}`,
    })
    return Response.json({ success: true })
  } catch {
    // Avoid exposing SMTP details or customer information in responses and logs.
    console.error('Booking email delivery failed.')
    return Response.json({ success: false, error: 'We could not send your request. Please email info@parkandplayarcade.com or call us.' }, { status: 503 })
  } finally {
    transporter.close()
  }
}
