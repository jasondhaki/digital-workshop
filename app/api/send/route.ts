import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// 1. Initialize Resend with your API Key (We'll get this in a second)
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // 2. Send the email
    const data = await resend.emails.send({
      from: 'Workshop Contact <onboarding@resend.dev>', // Resend provides this for testing
      to: ['jasondhaki05@gmail.com'], // REPLACE THIS WITH YOUR REAL EMAIL
      subject: `New Message from ${name} // Digital Workshop`,
      replyTo: email,
      html: `
        <div style="font-family: monospace; background-color: #0f1115; color: #fff; padding: 20px; border: 1px solid #1e293b;">
          <h2 style="color: #6366f1;">// NEW_INCOMING_MESSAGE</h2>
          <p><strong>SENDER:</strong> ${name}</p>
          <p><strong>EMAIL:</strong> ${email}</p>
          <hr style="border: 0; border-top: 1px solid #1e293b; margin: 20px 0;" />
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}