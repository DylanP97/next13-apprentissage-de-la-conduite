import { NextResponse } from "next/server";
import { transporter, contactMail } from "@/app/libs/transporter";
import getCurrentUser from "@/app/actions/getCurrentUser";

// const postmark = require("postmark");
// const postmarkApp = new postmark.ServerClient(process.env.POSTMARK_API);

export async function POST(request: Request, response: any) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.error();
    }

    const body = await request.json();
    const { email, firstName, message } = body.data;

    await transporter.sendMail(contactMail(email, firstName, message), function (error: any) {
      if (error) return NextResponse.error();
    });

    // const messageInfo = `\n---\n ${firstName} vous a contacté`;

    // const postmarkResponse = await postmarkApp.sendEmail({
    //   From: process.env.POSTMARK_EMAIL,
    //   To: process.env.POSTMARK_EMAIL,
    //   Subject: messageInfo,
    //   TextBody: message,
    //   MessageStream: "outbound",
    // });

    // if (!postmarkResponse.ErrorCode) {
    //   return NextResponse.json({ message : "hii" });
    // }

    return NextResponse.json({ message : "success" });
  } catch (error: any) {
    console.log(error);
  }
}
