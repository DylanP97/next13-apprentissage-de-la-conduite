import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

const { ObjectId } = require("mongodb");

export async function POST(request: Request) {
  const body = await request.json();
  let { data } = body;

  const commentId = new ObjectId().toHexString();

  await prisma.comment.create({
    data: {
      id: commentId,
      content: data.content,
      blog: {
        connect: {
          id: data.blogId,
        },
      },
      commenter: {
        connect: {
          id: data.commenterId,
        },
      },
    },
  });

  return NextResponse.json({ message: "Comment created!" });
}
