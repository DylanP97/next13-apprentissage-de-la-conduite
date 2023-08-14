import prisma from "@/app/libs/prismadb";
import { mailValidAccepted, transporter } from "@/app/libs/transporter";
import { NextResponse } from "next/server";

interface IParams {
  userId?: string;
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  try {
    const { userId } = params;
    const body = await request.json();
    const { data } = body;

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: data,
    });

    if (!user) {
      return null;
    }

    if (data.isAccepted) {
      const mail = mailValidAccepted(data.email, data.firstName);

      await transporter.sendMail(mail, function (error: any) {
        if (error) {
          console.log(error);
        }
      });
    }

    return NextResponse.json({
      message: "User successfully updated",
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, status: 500 });
  }
}

export async function DELETE({ params }: { params: IParams }) {
  try {
    const { userId } = params;

    const user = await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return null;
    }

    return NextResponse.json({
      message: "User successfully deleted",
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, status: 500 });
  }
}