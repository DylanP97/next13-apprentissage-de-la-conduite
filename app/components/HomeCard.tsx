"use client";

import { dateParser } from "../libs/utils";
import illustration from "@/public/images/illustration.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      onClick={() => router.push(`/article/${blog.id}`)}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="bg-[#030213] border-2 border-white rounded-xl overflow-hidden cursor-pointer group hover:bg-white transition-colors"
      data-testid="blog-item"
    >
      <div className="relative h-48">
        <Image
          fill
          sizes="(max-width: 768px) 100vw,
         (max-width: 1200px) 50vw,
         33vw"
          src={blog?.imageUrl ? `${blog?.imageUrl}` : illustration}
          alt={blog.title}
          className="object-cover transition-transform group-hover:scale-105"
          priority
        />
        <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
          {blog?.tags?.map((tag: string) => (
            <span key={tag} className="bg-white/80 text-[#030213] px-2 py-1 rounded-full text-xs font-medium group-hover:bg-[#030213]/80 group-hover:text-white">
              #{tag}
            </span>
          ))}
        </div>
        <time className="absolute bottom-2 right-2 bg-white/80 text-[#030213] px-2 py-1 rounded-full text-xs font-medium group-hover:bg-[#030213]/80 group-hover:text-white">
          {dateParser(blog.createdAt)}
        </time>
      </div>
      <div className="p-4">
        <h2
          className={`text-md font-semibold transition-colors duration-200 line-clamp-2 ${isHover ? "text-[#030213]" : "text-white"
            } group-hover:text-[#030213] hover:text-[#91e5f6]`}
        >
          {blog.title}
        </h2>
      </div>
    </div>
  );
};
