import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

interface IParams {
  token?: string;
}

const postmark = require("postmark");
const postmarkApp = new postmark.ServerClient(process.env.POSTMARK_API);

export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    const { token } = params;
    const body = await request.json();
    const { password } = body;
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.update({
      where: {
        resetPasswordToken: token,
      },
      data: {
        hashedPassword: hashedPassword,
        resetPasswordToken: "",
        resetPasswordExpires: null,
      },
    });

    if (!user) {
      return null;
    }

    const email = user.email;

    if (!email) {
      return null;
    }

    await postmarkApp.sendEmail({
      From: process.env.POSTMARK_EMAIL,
      To: email,
      Subject: `Votre mot de passe a été changé avec succès.`,
      TextBody: `Votre mot de passe a été modifié avec succès. En cas d'erreur n'hésitez pas à nous contacter ou à recommencer la procédure de changement de mot de passe.`,
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
