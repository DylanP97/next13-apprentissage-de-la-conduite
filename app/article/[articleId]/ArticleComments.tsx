"use client";

import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import WriteComment from "./WriteComment";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface ArticleCommentsProps {
  commentsList: any;
  currentUser: any;
}

const ArticleComments: React.FC<ArticleCommentsProps> = ({
  commentsList,
  currentUser,
}): any => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "1rem",
        borderTop: "4px #fff solid",
        padding: "1.5rem 0.5rem",
        marginTop: "50px",
      }}
    >
      <h3>{commentsList.length} commentaires</h3>
      <WriteComment currentUser={currentUser} />
      {commentsList.map((comment: any) => (
        <Comment key={comment.id} {...comment} />
      ))}
    </div>
  );
};

export default ArticleComments;
