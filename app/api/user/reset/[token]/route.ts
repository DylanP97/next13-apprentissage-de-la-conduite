import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

interface IParams {
  token?: string;
}

// Conditional Postmark initialization
let postmarkApp: any = null;
if (process.env.POSTMARK_API) {
  const postmark = require("postmark");
  postmarkApp = new postmark.ServerClient(process.env.POSTMARK_API);
}

export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    const { token } = params;
    const body = await request.json();
    const { password } = body;
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.update({
      where: { resetPasswordToken: token },
      data: {
        hashedPassword,
        resetPasswordToken: "",
        resetPasswordExpires: null,
      },
    });

    if (!user) {
      throw new Error("Invalid User");
    }

    const email = user.email;
    if (!email) {
      throw new Error("Invalid Email");
    }

    // Only send email if Postmark is configured
    if (postmarkApp && process.env.POSTMARK_EMAIL) {
      try {
        await postmarkApp.sendEmail({
          From: process.env.POSTMARK_EMAIL,
          To: email,
          Subject: `Votre mot de passe a été changé avec succès.`,
          TextBody: `Votre mot de passe a été modifié avec succès. En cas d'erreur n'hésitez pas à nous contacter ou à recommencer la procédure de changement de mot de passe.`,
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
      message: "Password updated. Email sending skipped or successful.",
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, status: 500 });
  }
}
