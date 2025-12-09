import getBlogs from "@/app/actions/getBlogs";
import getBlogById from "@/app/actions/getBlogById";
import ClientOnly from "@/app/components/ClientOnly";
import EditionArticleClient from "./EditionArticleClient";
import Footer from "@/app/components/Footer";

interface IParams {
  articleId?: string;
}

const EditionArticlePage = async ({ params }: { params: IParams }) => {
  const blogs = await getBlogs();
  const blog = await getBlogById(params);

  return (
    <ClientOnly>
      <EditionArticleClient blogs={blogs} blog={blog} />
      <Footer />
    </ClientOnly>
  );
};

export default EditionArticlePage;
