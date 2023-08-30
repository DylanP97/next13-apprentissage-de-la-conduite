import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { signUpRequestAccepted, transporter } from "@/app/libs/transporter";
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
      const mail = signUpRequestAccepted(data.email, data.firstName);

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

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { userId } = params;

  if (!userId || typeof userId !== "string") {
    throw new Error("Invalid ID");
  }

  const user = await prisma.user.delete({
    where: {
      id: userId,
    },
  });

  const account = await prisma.account.findMany({
    where: {
      userId: userId,
    }
  }).then((account: any) => {
    prisma.account.delete({
      where: {
        id: account.id,
      }
    })
  });

  return NextResponse.json({user, account});
}
