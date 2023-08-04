import prisma from "@/app/libs/prismadb";

export default async function getUsers() {
  try {
    const users = await prisma.user.findMany();

    const safeUsers = users.map((user: any) => ({
      ...user,
      createdAt: user.createdAt.toISOString(),
    }));

    return safeUsers;
  } catch (error: any) {
    throw new Error(error);
  }
}