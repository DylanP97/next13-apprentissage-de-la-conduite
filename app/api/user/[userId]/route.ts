import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  userId?: string;
}

// Step 1: Conditional Postmark initialization
let postmarkApp: any = null;
if (process.env.POSTMARK_API) {
  const postmark = require("postmark");
  postmarkApp = new postmark.ServerClient(process.env.POSTMARK_API);
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  try {
    const { userId } = params;
    const body = await request.json();
    const { data } = body;

    const user = await prisma.user.update({
      where: { id: userId },
      data: data,
    });

    if (!user) {
      throw new Error("Invalid User");
    }

    // Step 2: Only send email if Postmark is configured
    if (data.isAccepted) {
      if (postmarkApp && process.env.POSTMARK_EMAIL) {
        try {
          const postmarkResponse = await postmarkApp.sendEmail({
            From: process.env.POSTMARK_EMAIL,
            To: data.email,
            Subject: `Votre demande d'inscription a été validé`,
            TextBody: `Bonjour ${data.firstName} Vous pouvez désormais sélectionner votre abonnement : ${process.env.BASE_URL}`,
            MessageStream: "outbound",
          });

          if (!postmarkResponse.ErrorCode) {
            console.log("Postmark email sent successfully");
          }
        } catch (err: any) {
          console.error("Postmark send failed:", err.message);
        }
      } else {
        console.log("Postmark not configured, skipping email send.");
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
    where: { id: userId },
  });

  const accounts = await prisma.account.findMany({
    where: { userId: userId },
  });

  // Delete all accounts safely
  for (const acc of accounts) {
    await prisma.account.delete({ where: { id: acc.id } });
  }

  return NextResponse.json({ user, accounts });
}
