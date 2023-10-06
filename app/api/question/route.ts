import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  const body = await request.json();
  let { data } = body;

  await prisma.question.create({
    data: {
      ...data,
      published: true,
    },
  });

  return NextResponse.json({ message: "Question created!" });
}
