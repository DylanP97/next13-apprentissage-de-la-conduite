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
      className="bg-[#030213] border-2 border-white rounded-xl overflow-hidden cursor-pointer group hover:bg-white transition-colors"
      data-testid="blog-item"
    >
      <div className="relative h-48">
        <Image
          fill
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
        <h2 className="text-lg font-semibold text-white group-hover:text-[#030213] line-clamp-2">{blog.title}</h2>
      </div>
    </div>
  );
};