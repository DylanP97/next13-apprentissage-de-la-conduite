import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
const cloudinary = require('@/middleware/cloudinary');

interface IParams {
  questionId?: string;
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  try {
    cloudinary()

    const { questionId } = params;
    const body = await request.json();
    const { data } = body;

    if (data.answers) data.answers = JSON.parse(data.answers);

    const question = await prisma.question.update({
      where: {
        id: questionId,
      },
      data: data,
    });

    if (!question) {
      return null;
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

export async function DELETE({ params }: { params: IParams }) {
  try {
    const { questionId } = params;

    const question = await prisma.question.delete({
      where: {
        id: questionId,
      },
    });

    if (!question) {
      return null;
    }

    return NextResponse.json({
      message: "Question successfully deleted",
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, status: 500 });
  }
}