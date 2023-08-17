import prisma from "@/app/libs/prismadb";

export default async function getPublishedQuestions() {
  try {
    const questions = await prisma.question.findMany({
        where: {
            published: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const safeQuestions = questions.map((question: any) => ({
      ...question,
      createdAt: question.createdAt.toISOString(),
    }));

    return safeQuestions;
  } catch (error: any) {
    throw new Error(error);
  }
}