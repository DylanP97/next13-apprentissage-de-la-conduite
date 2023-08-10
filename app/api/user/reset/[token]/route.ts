import prisma from "@/app/libs/prismadb";
import {
  transporter,
  passwordSuccesfullyChanged,
} from "@/app/libs/transporter";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

interface IParams {
  token?: string;
}

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

    const mail = passwordSuccesfullyChanged(email);

    await transporter.sendMail(mail, (error: any, info: any) => {
      if (error) throw new Error();
    });

    return NextResponse.json({
      message: "email sended succesfully",
      status: 200,
    });
  } catch (error: any) {
    NextResponse.json({ message: error.message, status: 500 });
  }
}
