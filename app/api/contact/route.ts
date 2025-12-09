// api/contact/route.ts
import { NextResponse } from "next/server";

let postmarkApp: any = null;
if (process.env.POSTMARK_API) {
  const postmark = require("postmark");
  postmarkApp = new postmark.ServerClient(process.env.POSTMARK_API);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, firstName, message } = body?.data ?? {};

    if (!email || !firstName || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const fromEmail = process.env.POSTMARK_EMAIL;
    if (!postmarkApp || !fromEmail) {
      console.log("Postmark not configured, skipping email send.");
      return NextResponse.json({
        message:
          "Email sending is disabled (no Postmark token provided).",
      });
    }

    const postmarkResponse = await postmarkApp.sendEmail({
      From: fromEmail,
      To: fromEmail,
      ReplyTo: email,
      Subject: `${firstName} vous a contacté`,
      TextBody: `De: ${firstName} <${email}>\n\n${message}`,
      MessageStream: "outbound",
    });

    if (!postmarkResponse.ErrorCode) {
      return NextResponse.json({ message: "Message envoyé" });
    }

    return NextResponse.json({ error: "Envoi échoué" }, { status: 500 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
