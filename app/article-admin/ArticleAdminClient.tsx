'use client'

import { Button } from "react-bootstrap";
import BasicCard from "../components/BasicCard";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface ArticleAdminClientProps {
  blogs: any
}

const ArticleAdminClient: React.FC<ArticleAdminClientProps> = ({ blogs }) => {
  const [blogsData, setBlogsData] = useState(blogs)
  const router = useRouter()

  const handleNewArticle = async () => {
    axios.post(`http://localhost:3000/api/blog`)
      .then((response) => {
        console.log(response.data)
        console.log(response.data.blog)
        console.log(response.data.blog.id)
        router.push(`/edition-article/${response.data.blog.id}`)
      })
      .catch(() => {
        alert("une erreur s'est produite dans la requête");
      })
  }

  const TogglePublish = async (blogId: string | number, status: any) => {
    const data = { "published": !status }
    axios.put(`http://localhost:3000/api/blog/${blogId}`, { data })
      .then((response) => {
        const updatedBlog = response.data.data;
        const blogIndex = blogs.findIndex((blog: any) => blog.id === updatedBlog.id);
        if (blogIndex !== -1) {
          const updatedBlogs = [...blogs];
          updatedBlogs[blogIndex] = updatedBlog;
          setBlogsData(updatedBlogs);
        }
        alert(!status ? "le blog est désormais visible" : "le blog est désormais invisible");
      })
      .catch(() => {
        alert("une erreur s'est produite dans la requête");
      })
  };

  const DeleteArticle = async (blogId: string | number) => {
    console.log(blogId)
    axios.delete(`http://localhost:3000/api/blog/${blogId}`)
      .then(() => {
        alert("ce blog a été supprimer");
      })
      .catch(() => {
        alert("une erreur s'est produite dans la requête");
      })
  };


  return (
    <div className="home-container">
      <h1>Gérer les articles</h1>
      <p>Ici changer la visibilité, jeter un oeil, modifier ou supprimer l&apos;un de vos articles.</p>
      <br />
      <Button className="btn-30color" onClick={() => { handleNewArticle() }}>Écrire un nouveau article</Button>
      <hr />
      <div className="article-table">
        {Object.values(blogsData).map((blog: any) => {
          return (
            <BasicCard key={blog.id} data={blog} type="article" toggleMethod={TogglePublish} deleteMethod={DeleteArticle} />
          )
        })}
      </div>
      <br />
    </div>
  )
}

export default ArticleAdminClient