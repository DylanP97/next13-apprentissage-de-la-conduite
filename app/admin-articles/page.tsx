import getBlogs from "@/app/actions/getBlogs";
import ClientOnly from "@/app/components/ClientOnly";
import ArticleAdminClient from "./ArticleAdminClient";
import Footer from "../components/Footer";

const ArticleAdminPage = async () => {
  const blogs = await getBlogs();

  return (
    <ClientOnly>
      {blogs ? (
        <ArticleAdminClient blogs={blogs} />
      ) : (
        <h1>Il n&apos;y a pas d&apos;article pour le moment!</h1>
      )}
      <Footer />
    </ClientOnly>
  );
};

export default ArticleAdminPage;
