# Booking email configuration

Set these server-only values in Vercel. Never put SMTP credentials in a NEXT_PUBLIC variable or commit them.

- `SMTP_USER` and `SMTP_PASS`: authenticated SMTP credentials (for Gmail, the existing app password).
- `EMAIL_TO`: the business recipient address; supports up to five comma-separated recipients.
- `SMTP_FROM`: authenticated/verified sender address, normally `info@parkandplayarcade.com`. Defaults to `SMTP_USER` for compatibility with the existing Gmail setup.
- `SMTP_HOST`: omit to retain Gmail. Set to `mail.smtp2go.com` only after sender verification and SMTP credentials are ready.
- `SMTP_PORT`: defaults to `587` with required STARTTLS; `465` uses implicit TLS.

The customer is Reply-To, never the authenticated sender. Delivery errors return a generic message and appear on the contact form. Tests mock SMTP; they do not send messages.

Before removing the existing Google Workspace subscription, preserve historical mail, verify new inbound routing, configure Gmail Send mail as with the external SMTP service, and test incoming mail, outgoing replies, SPF/DKIM/DMARC, and visible message headers. A forwarding destination should not be added as a visible CC or Reply-To. Retain the existing MX records until the replacement is ready.

Development checks: Node 22.18+ or Node 24, `npm ci --legacy-peer-deps`, `npm test`, `npm run typecheck`, `npm run build`, and `npm audit`.
