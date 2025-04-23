import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  console.log('🌐  /api/contact handler start')
  console.log('Env:', {
    user: !!process.env.SMTP_USER,
    pass: !!process.env.SMTP_PASS,
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    to: process.env.EMAIL_TO,
  })

  const { name, email, eventType, date, message } = await request.json()

  const transporter = nodemailer.createTransport({
    service: 'gmail',              // using Gmail service
    auth: {
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_PASS!,
    },
  })

  // Verify SMTP connection configuration
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

  // Try to send the mail
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
