import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  questionId?: string;
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return NextResponse.error();

    const { questionId } = params;
    const body = await request.json();
    const { data } = body;

    const question = await prisma.question.update({
      where: {
        id: questionId,
      },
      data: data,
    });

    if (!question) {
      throw new Error("Invalid Question");
    }

    return NextResponse.json({
      message: "Question successfully updated",
      status: 200,
      data: question,
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

  const { questionId } = params;

  if (!questionId || typeof questionId !== "string") {
    throw new Error("Invalid ID");
  }

  const question = await prisma.question.deleteMany({
    where: {
      id: questionId,
    },
  });

  return NextResponse.json(question);
}
