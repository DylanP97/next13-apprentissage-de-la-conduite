"use client";

import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import getUserById from "@/app/actions/getUserById";

interface ArticleAuthorProps {
  author: any;
}

const ArticleAuthor: React.FC<ArticleAuthorProps> = ({ author }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        fontStyle: "italic",
        gap: "1rem",
        padding: "1rem",
      }}
    >
      <div
        style={{
          borderRadius: "100%",
          overflow: "hidden",
        }}
      >
        <Image src={author.image} alt="" height={35} width={35} />
      </div>
      <p>Écrit par {author.name || author.firstName} - Moniteur depuis ...</p>
    </div>
  );
};

export default ArticleAuthor;
