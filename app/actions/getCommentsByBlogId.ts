import prisma from "@/app/libs/prismadb";

interface IParams {
    articleId?: string;
  }

export default async function getCommentsByBlogId(params: IParams) {
  try {
    const { articleId } = params;

    const comments = await prisma.comment.findMany({
        where: {
            content: 'Great blog post!'
        },
        include: {
          commenter: true,
        },
    });

    const safeComments = comments.map((comment: any) => ({
      ...comment,
      createdAt: comment.createdAt.toISOString(),
    }));

    return safeComments;
  } catch (error: any) {
    throw new Error(error);
  }
}