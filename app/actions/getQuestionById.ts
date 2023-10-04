import prisma from "@/app/libs/prismadb";

interface IParams {
  questionId?: string;
}

export default async function getQuestionById(params: IParams) {
  try {
    const { questionId } = params;
    
    const question = await prisma.question.findUnique({
      where: {
        id: questionId,
      },
    });

    if (!question) {
      throw new Error('Invalid question');
    }

    return {
      ...question,
    };
  } catch (error: any) {
    throw new Error(error);
  }
}