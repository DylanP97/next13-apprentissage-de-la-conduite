'use client'

import { Button } from "react-bootstrap";
import BasicCard from "../components/BasicCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface ArticleAdminClientProps {
  blogs: any
}

const ArticleAdminClient: React.FC<ArticleAdminClientProps> = ({ blogs }) => {
  const [blogsData, setBlogsData] = useState(blogs)
  const router = useRouter()

  useEffect(() => {
    setBlogsData(blogsData)
  }, [blogsData]);

  const handleNewArticle = async () => {
    axios.post(`/api/blog`)
      .then((response) => {
        router.push(`/admin-edition/${response.data.blogId}`)
      })
      .catch((error) => {
        console.log(error)
        toast.error("une erreur s'est produite dans la requête");
      })
  }

  const togglePublish = async (blogId: string | number, status: any) => {
    const data = { "published": !status }
    axios.put(`/api/blog/${blogId}`, { data })
      .then((response) => {
        const updatedBlog = response.data.data;
        const blogIndex = blogsData.findIndex((blog: any) => blog.id === updatedBlog.id);
        if (blogIndex !== -1) {
          const updatedBlogs = [...blogsData];
          updatedBlogs[blogIndex] = updatedBlog;
          setBlogsData(updatedBlogs);
        }
        toast.success(!status ? "Le blog est désormais visible." : "Le blog est désormais invisible.");
      })
      .catch((error) => {
        console.log(error)
        toast.error("Une erreur s'est produite dans la requête.");
      })
  };

  const deleteArticle = async (blogId: string) => {
    axios.delete(`/api/blog/${blogId}`)
      .then(() => {
        const blogIndex = blogsData.findIndex((blog: any) => blog.id === blogId);
        if (blogIndex !== -1) {
          let updatedBlogs = [...blogsData];
          const newUpdatedBlogs = updatedBlogs.filter((_, index) => index !== blogIndex);
          setBlogsData(newUpdatedBlogs);
        }
        toast.success("Ce blog a été supprimer.");
      })
      .catch(() => {
        toast.error("Une erreur s'est produite dans la requête.");
      })
  };


  return (
    <div className="home-container">
      <h1>Gérer les articles</h1>
      <p>Ici changer la visibilité, jeter un oeil, modifier ou supprimer l&apos;un de vos articles.</p>
      <p>Nombre total d&apos;articles actuellement : {blogsData.length}</p>
      <p>Nombre d&apos;articles visibles aux élèves : {blogsData.filter((blog: any) => blog.published).length}</p>
      <br />
      <Button className="btn-10color" onClick={() => { handleNewArticle() }}>Écrire un nouveau article</Button>
      <hr />
      <div className="article-table">
        {Object.values(blogsData).map((blog: any) => {
          return (
            <BasicCard key={blog.id} data={blog} type="article" toggleMethod={togglePublish} deleteMethod={deleteArticle} />
          )
        })}
      </div>
      <br />
    </div>
  )
}

export default ArticleAdminClient