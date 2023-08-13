import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  blogId?: string;
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  try {
    const { blogId } = params;
    const body = await request.json();
    const { data } = body;

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
      data: blog
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, status: 500 });
  }
}

export async function DELETE({ params }: { params: IParams }) {
    try {
      const { blogId } = params;
  
      const blog = await prisma.blog.delete({
        where: {
          id: blogId,
        }
      });
  
      if (!blog) {
        return null;
      }
  
      return NextResponse.json({
        message: "Blog successfully deleted",
        status: 200,
      });
    } catch (error: any) {
      return NextResponse.json({ message: error.message, status: 500 });
    }
  }