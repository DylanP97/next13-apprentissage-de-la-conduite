import prisma from "@/app/libs/prismadb";

export default async function getUserById(
    userId?: string
) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return null;
    }

    return {
      firstName: user.firstName || null,
      lastName: user.lastName || null,
      name: user.name || null,
      image: user.image || null,
      email: user.email || null,
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
