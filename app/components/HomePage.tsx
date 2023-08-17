'use client'

import React, { useEffect, useState } from "react";
import { HomeCard } from "./HomeCard";
import HomeGreeting from "./HomeGreeting";
import { TagsEditor } from "./TagsEditor";

interface HomePageProps {
  currentUser: any,
  blogs: any,
}

const HomePage: React.FC<HomePageProps> = ({ currentUser, blogs }) => {
  // const [count, setCount] = useState(9);
  // const [data, setData] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // const loadMore = () => {
  //   if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight) {
  //     setLoadPost(true);
  //   }
  // };

  // useEffect(() => {
  //     // setCount(count + 6);
  //   }
  //   //     window.addEventListener('scroll', loadMore);
  //   //     return () => window.removeEventListener('scroll', loadMore);

  return (
    <main className="home-container">
      <HomeGreeting currentUser={currentUser} />
      <br />
      Filtrer par sujets :
      <TagsEditor blogs={blogs} tags={selectedTags} state={setSelectedTags} />
      <hr />
      {
        <div className="home-grid">
          {blogs.length === 0 ? (
            <h1>Il n&apos;y a pas d&apos;articles</h1>
          ) : (
            Object.values(blogs).map((blog: any) => {
              if (selectedTags.length === 0) {
                return (
                  <HomeCard blog={blog} key={`nofilter${blog.id}`} />
                );
              } else if (
                selectedTags.some((tag: string) => blog.tags.includes(tag))
              ) {
                return <HomeCard blog={blog} key={`filter${blog.id}`} />;
              }
              return null;
            })
          )}
        </div>
      }
    </main>
  );
}

export default HomePage;
