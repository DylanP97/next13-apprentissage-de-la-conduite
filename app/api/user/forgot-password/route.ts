import prisma from "@/app/libs/prismadb";
const crypto = require("crypto");
import { NextResponse } from "next/server";

const postmark = require("postmark");
const postmarkApp = new postmark.ServerClient(process.env.POSTMARK_API);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    const token = crypto.randomBytes(20).toString("hex");
    const resetPasswordExpires = Date.now() + 3600000;

    const user = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        resetPasswordToken: token,
        resetPasswordExpires: resetPasswordExpires,
      },
    });

    if (!user) {
      throw new Error("Invalid User");
    }

    await postmarkApp.sendEmail({
      From: process.env.POSTMARK_EMAIL,
      To: email,
      Subject: `Lien de réinitialisation de votre mot de passe.`,
      TextBody: `Vous recevez ceci parce que vous (ou quelqu'un d'autre) avez demandé la réinitialisation du mot de passe de votre compte. Si vous ne l'avez pas demandé, veuillez ignorer cet e-mail et votre mot de passe restera inchangé. Veuillez cliquer sur le lien suivant ou le coller dans votre navigateur pour terminer le processus : ${process.env.BASE_URL}reset/${token}`,
      MessageStream: "outbound",
    });

    return NextResponse.json({
      message: "email sended succesfully",
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, status: 500 });
  }
}
