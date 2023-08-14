import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

const { ObjectId } = require("mongodb");

export async function POST(
  request: Request, 
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const blogId = new ObjectId().toHexString()

  const blog = await prisma.blog.create({
    data: {
      id : blogId,
      blogId : blogId,
      title : "",
      category : "",
      tags : [],
      slug : "",
      data : {},
      imageUrl : "",
      published : false,
      posterId: currentUser.id
    }
  });

  return NextResponse.json(blog);
}