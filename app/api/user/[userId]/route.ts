import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  userId?: string;
}

const postmark = require("postmark");
const postmarkApp = new postmark.ServerClient(process.env.POSTMARK_API);


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
      throw new Error('Invalid User');
    }

    if (data.isAccepted) {
      const postmarkResponse = await postmarkApp.sendEmail({
        From: process.env.POSTMARK_EMAIL,
        To: data.email,
        Subject: `Votre demande d'inscription a été validé`,
        TextBody: `Bonjour ${data.firstName} Vous pouvez désormais sélectionné votre abonnement : ${process.env.BASE_URL}`,
        MessageStream: "outbound",
      });
  
      if (!postmarkResponse.ErrorCode) {
        return NextResponse.json({ message : "hii" });
      }
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
