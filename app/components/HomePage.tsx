"use client";

import React, { useState } from "react";
import Image from "next/image";
import { HomeCard } from "./HomeCard";
import HomeGreeting from "./HomeGreeting";
import { TagsEditor } from "./TagsEditor";
import { useRouter } from "next/navigation";

interface HomePageProps {
  currentUser: any;
  blogs: any;
}

const HomePage: React.FC<HomePageProps> = ({ currentUser, blogs }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const router = useRouter();
  const [hover, setHover] = useState(false);

  // Sort blogs by createdAt descending to get latest first
  const sortedBlogs = [...blogs].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // Get the latest blog for featured section
  const featuredBlog = sortedBlogs[0];
  const otherBlogs = sortedBlogs.slice(1);

  const filteredBlogs = otherBlogs.filter((blog: any) => {
    if (selectedTags.length === 0) return true;
    return selectedTags.some((tag: string) => blog?.tags?.includes(tag));
  });

  return (
    <main className="max-w-7xl mx-auto px-2 md:px-6 lg:px-8 py-2">
      <div className="text-center mb-2">
        <HomeGreeting currentUser={currentUser} />
      </div>

      {/* Prominent Quiz Access */}
      <div className="bg-gradient-to-r from-[#91e5f6] to-[#118ba3] text-[#030213] p-4 rounded-xl shadow-lg my-2 text-center">
        <h2 className="text-2xl font-bold my-2">Prêt à tester vos connaissances ?</h2>
        <p className="my-2 italic text-sm">Accédez à notre quiz interactif sur le code de la route et améliorez vos compétences !</p>
        <button
          onClick={() => router.push("/quiz")}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          // add relative/z-index + pointer-events to avoid overlay issues
          className={`relative z-10 px-8 py-3 rounded-full font-bold text-lg transition-colors
          ${hover ? "bg-[#030213] text-white" : "bg-white text-gray-900"}`}
        >
          Commencer le Quiz
        </button>
      </div>

      <p className="italic font-bold text-lg text-center md:text-start py-2">
        Découvrez nos derniers articles sur le code de la route
      </p>

      <TagsEditor blogs={blogs} tags={selectedTags} state={setSelectedTags} />

      {blogs && blogs.length > 0 ? (
        <div className="space-y-12">
          {/* Featured Article */}
          {featuredBlog && (
            <div
              className="relative overflow-hidden rounded-xl cursor-pointer group h-96"
              onClick={() => router.push(`/article/${featuredBlog.id}`)}
            >
              <Image
                src={featuredBlog.imageUrl || "/images/illustration.jpg"}
                alt={featuredBlog.title}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover transition-transform group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <div className="flex flex-wrap gap-2 mb-2">
                  {featuredBlog.tags?.map((tag: string) => (
                    <span key={tag} className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-xl md:text-3xl font-bold mb-2">{featuredBlog.title}</h2>
                <time className="text-sm opacity-80">{new Date(featuredBlog.createdAt).toLocaleDateString("fr-FR")}</time>
              </div>
            </div>
          )}

          {/* Grid of Other Blogs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="HomePage-blog-grid">
            {filteredBlogs.map((blog: any) => (
              <HomeCard blog={blog} key={blog.id} />
            ))}
          </div>
        </div>
      ) : (
        <h1 className="text-center text-xl font-semibold mt-8">Il n&apos;y a pas d&apos;articles</h1>
      )}
    </main>
  );
};

export default HomePage;