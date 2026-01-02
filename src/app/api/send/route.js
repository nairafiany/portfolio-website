import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL;

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: ["naira.afiany@gmail.com"], // Email tujuan (email kamu)
      subject: `New message from ${name}`,
      replyTo: email, // 👍 Tambahan bagus: biar kalau di-reply langsung ke pengirim
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
