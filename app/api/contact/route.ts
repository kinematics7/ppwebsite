// app/api/contact/route.ts

import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  // 1. Entry log
  console.log('🌐  /api/contact handler start')

  // 2. Show what env vars are actually loaded
  console.log('Env:', {
    user: !!process.env.SMTP_USER,
    pass: !!process.env.SMTP_PASS,
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    to: process.env.EMAIL_TO,
  })

  // 3. Parse the incoming JSON payload
  const { name, email, eventType, date, message } = await request.json()

  // 4. Configure the transporter for Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_PASS!,
    },
  })

  // 5. Verify SMTP connection
  try {
    await transporter.verify()
    console.log('✅ SMTP connection OK')
  } catch (err: any) {
    console.error('❌ SMTP verify failed:', err)
    return NextResponse.json(
      { success: false, error: 'SMTP verify failed: ' + err.message },
      { status: 500 }
    )
  }

  // 6. Attempt to send the email
  try {
    const info = await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_TO,
      subject: `📬 New booking from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nEvent: ${eventType}\nDate: ${date}\n\n${message}`,
    })
    console.log('✉️  Email sent, messageId=', info.messageId)
    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('❌ sendMail error:', err)
    return NextResponse.json(
      { success: false, error: 'sendMail failed: ' + err.message },
      { status: 500 }
    )
  }
}
