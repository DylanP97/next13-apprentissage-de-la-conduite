import prisma from "@/app/libs/prismadb";
const crypto = require("crypto");

import { transporter, resetPasswordLink } from "@/app/libs/transporter";
import { NextResponse } from "next/server";

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
      return null;
    }

    const mail3 = resetPasswordLink(email, token);

    await transporter.sendMail(mail3, (error: any) => {
      if (error) throw new Error();
    });

    return NextResponse.json({
      message: "email sended succesfully",
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, status: 500 });
  }
}
