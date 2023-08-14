import prisma from "@/app/libs/prismadb";

interface IParams {
  articleId?: string;
}

export default async function getBlogById(params: IParams) {
  try {
    const { articleId } = params;
    
    const blog = await prisma.blog.findUnique({
      where: {
        id: articleId,
      },
    });

    if (!blog) {
      return null
    }

    return {
      ...blog,
    };
  } catch (error: any) {
    throw new Error(error);
  }
}