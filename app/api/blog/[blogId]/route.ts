import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  blogId?: string;
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return NextResponse.error();

    const { blogId } = params;
    const body = await request.json();
    const { data } = body;

    if (data.data) data.data = JSON.parse(data.data);

    const blog = await prisma.blog.update({
      where: {
        id: blogId,
      },
      data: data,
    });

    if (!blog) {
      return null;
    }

    return NextResponse.json({
      message: "Blog successfully updated",
      status: 200,
      data: blog,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams },
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { blogId } = params;

  if (!blogId || typeof blogId !== "string") {
    throw new Error("Invalid ID");
  }

  const blog = await prisma.blog.deleteMany({
    where: {
      id: blogId,
    },
  });

  return NextResponse.json(blog);
}
