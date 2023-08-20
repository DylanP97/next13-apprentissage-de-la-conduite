import prisma from "@/app/libs/prismadb";

interface IParams {
  blogId?: string;
  posterId?: string;
  title?: string;
  category?: string;
  tags?: any;
  slug?: string;
  published?: boolean;
}

export default async function getBlogs(
  params: IParams
) {
  try {
    const { blogId, posterId, title, category, tags, slug, published } = params;

    const query: any = {};

    if (blogId) {
      query.blogId = blogId;
    };

    if (posterId) {
      query.posterId = posterId;
    }

    if (title) {
      query.title = title;
    }

    if (category) {
      query.category = category;
    }

    if (tags) {
      query.tags = tags;
    };

    if (slug) {
      query.slug = slug;
    }

    if (published) {
      query.published = published;
    }

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
    console.log(error);
    throw new Error(error);
  }
}
