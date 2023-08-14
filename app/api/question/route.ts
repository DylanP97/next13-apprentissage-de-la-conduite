import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
const cloudinary = require('../middleware/cloudinary');

export async function POST(request: Request) {
  cloudinary()

  const body = await request.json();

  let { question, answers, correctAnswer, imageUrl, published } = body;

  answers = JSON.parse(answers);

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  await prisma.question.create({
    data: {
      question,
      answers,
      correctAnswer,
      imageUrl,
      published,
    },
  });

  return NextResponse.json({ message: "Question created!" });
}