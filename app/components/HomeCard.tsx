"use client";

import { dateParser } from "../libs/utils";
import illustration from "@/public/images/illustration.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface HomeCardProps {
  blog: {
    id: string;
    imageUrl?: string;
    title: string;
    tags: string[];
    createdAt: string;
  };
}

export const HomeCard = ({ blog }: HomeCardProps) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/article/${blog.id}`)}
      className="home-card"
      data-testid="blog-item"
    >
      <article>
        <div className="card-top">
          <time>Le {dateParser(blog.createdAt)}</time>
          <Image
            width={1000}
            height={1000}
            src={blog?.imageUrl ? `${blog?.imageUrl}` : illustration}
            alt=""
            priority
          />
        </div>
        <div className="card-bottom">
          <div className="card-tags">
            {blog?.tags?.map((tag: string) => {
              return <p key={tag}>#{tag}</p>;
            })}
          </div>
          <h2>{blog.title}</h2>
        </div>
      </article>
    </div>
  );
};
