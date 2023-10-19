import prisma from "@/app/libs/prismadb";

export default async function getBlogs() {
  try {
    const query: any = {};

    const blogs = await prisma.blog.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeBlogs = blogs.map((blog: any) => ({
      ...blog,
      createdAt: blog.createdAt.toISOString(),
    }));

    return safeBlogs;
  } catch (error: any) {
    throw new Error(error);
  }
}
