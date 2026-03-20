import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, phone, message, form_source } = body;

    // ✅ Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // ✅ Send email
    const response = await resend.emails.send({
      from: 'Creativoxa Leads <onboarding@resend.dev>', // change later to your domain
      to: ['creativoxa@gmail.com'], // your inbox
      replyTo: email, // so you can reply directly
      subject: `🚀 New Lead from ${form_source || 'Website'}: ${name}`,
      html: `
        <h2>📩 New Enquiry Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr />
        <p><strong>Source:</strong> ${form_source || 'Website'}</p>
      `,
    });

    return NextResponse.json(
      { success: true, data: response },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Resend Error:', error);

    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}