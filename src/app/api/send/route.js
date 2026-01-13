import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    if (!process.env.RESEND_API_KEY) {
      throw new Error("Missing RESEND_API_KEY");
    }

    const myEmail = process.env.PERSONAL_EMAIL;
    if (!myEmail) {
      throw new Error("Missing PERSONAL_EMAIL environment variable");
    }

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",

      to: [myEmail],

      subject: `New message from ${name}`,

      reply_to: email,

      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("Server Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
