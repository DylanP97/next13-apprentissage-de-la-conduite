import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
  request: Request, 
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { 
    blogId,
    title,
    category,
    tags,
    slug,
    data,
    imageUrl,
    published,
   } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const blog = await prisma.blog.create({
    data: {
      blogId,
      title,
      category,
      tags,
      slug,
      data,
      imageUrl,
      published,
      posterId: currentUser.id
    }
  });

  return NextResponse.json(blog);
}
