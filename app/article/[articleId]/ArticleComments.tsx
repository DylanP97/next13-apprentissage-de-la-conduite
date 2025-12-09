// ArticleComments.tsx
"use client";

import { useState, useEffect } from "react";
import WriteComment from "./WriteComment";
import Comment from "./Comment";

interface ArticleCommentsProps {
  commentsList: any[];
  currentUser: any;
}

const ArticleComments: React.FC<ArticleCommentsProps> = ({ commentsList, currentUser }) => {
  const [comments, setComments] = useState(commentsList);

  useEffect(() => {
    setComments(commentsList);
  }, [commentsList]);

  const handleCommentPosted = () => {
    // Simple refresh: refetch or use SWR later
    window.location.reload(); // temporary
    // Better: revalidate with router.refresh() or use SWR
  };

  return (
    <div className="mt-16 pt-8 border-t-4 border-white">
      <h3 className="text-2xl font-bold mb-8">
        {comments.length} commentaire{comments.length > 1 ? "s" : ""}
      </h3>

      <WriteComment currentUser={currentUser} onCommentPosted={handleCommentPosted} />

      <div className="mt-10 space-y-8">
        {comments.map((comment) => (
          <Comment key={comment.id} {...comment} />
        ))}
      </div>
    </div>
  );
};

export default ArticleComments;