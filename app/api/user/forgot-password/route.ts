import prisma from "@/app/libs/prismadb";
const crypto = require("crypto");
import { NextResponse } from "next/server";

// Step 1: conditional Postmark initialization
let postmarkApp: any = null;
if (process.env.POSTMARK_API) {
  const postmark = require("postmark");
  postmarkApp = new postmark.ServerClient(process.env.POSTMARK_API);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    const token = crypto.randomBytes(20).toString("hex");
    const resetPasswordExpires = Date.now() + 3600000;

    const user = await prisma.user.update({
      where: { email: email },
      data: {
        resetPasswordToken: token,
        resetPasswordExpires: resetPasswordExpires,
      },
    });

    if (!user) {
      throw new Error("Invalid User");
    }

    // Step 2: only send email if Postmark is configured
    if (postmarkApp && process.env.POSTMARK_EMAIL) {
      try {
        await postmarkApp.sendEmail({
          From: process.env.POSTMARK_EMAIL,
          To: email,
          Subject: `Lien de réinitialisation de votre mot de passe.`,
          TextBody: `Vous recevez ceci parce que vous (ou quelqu'un d'autre) avez demandé la réinitialisation du mot de passe de votre compte. Si vous ne l'avez pas demandé, veuillez ignorer cet e-mail et votre mot de passe restera inchangé. Veuillez cliquer sur le lien suivant ou le coller dans votre navigateur pour terminer le processus : ${process.env.BASE_URL}reset/${token}`,
          MessageStream: "outbound",
        });
        console.log("Postmark email sent successfully");
      } catch (err: any) {
        console.error("Postmark send failed:", err.message);
      }
    } else {
      console.log("Postmark not configured, skipping email send.");
    }

    return NextResponse.json({
      message: "Email sending skipped or sent successfully",
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, status: 500 });
  }
}
