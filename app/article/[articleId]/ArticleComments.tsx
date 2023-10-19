"use client";

import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import WriteComment from "./WriteComment";

interface ArticleCommentsProps {
  commentsList: any;
  currentUser: any;
}

const ArticleComments: React.FC<ArticleCommentsProps> = ({
  commentsList,
  currentUser,
}): any => {
  const [commentsData, setCommentsData] = useState(commentsList);

  useEffect(() => {
    setCommentsData(commentsList);
  }, [commentsList]);

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
      <h3>{commentsData ? commentsData.length : "0"} commentaire{commentsData.length > 1 && 's'}</h3>
      <WriteComment currentUser={currentUser} />
      {commentsData && commentsData.map((comment: any) => (
        <Comment key={comment.id} {...comment} />
      ))}
    </div>
  );
};

export default ArticleComments;
