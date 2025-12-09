// components/WriteComment.tsx
"use client";

import Image from "next/image";
import defaultImage from "@/public/images/default.png";
import { Form, FloatingLabel, InputGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import { useAuthModal } from "@/app/AuthModalContext"; // Import

interface WriteCommentProps {
  currentUser: any;
  onCommentPosted?: () => void; // optional callback to refresh comments
}

const WriteComment: React.FC<WriteCommentProps> = ({ currentUser, onCommentPosted }) => {
  const [content, setContent] = useState("");
  const { openAuthModal } = useAuthModal(); // This is magic
  const params = useParams();
  const articleId = params?.articleId as string;

  const postComment = async () => {
    if (!content.trim()) return;

    try {
      await axios.post("/api/comment", {
        data: {
          commenterId: currentUser.id,
          content,
          blogId: articleId,
        },
      });
      toast.success("Commentaire ajouté !");
      setContent("");
      onCommentPosted?.();
    } catch (error) {
      toast.error("Erreur lors de l'ajout du commentaire");
    }
  };

  const handleClick = () => {
    if (!currentUser) {
      openAuthModal(); // Opens your beautiful modal
      return;
    }
    postComment();
  };

  return (
    <div className="flex items-center gap-4 w-full">
      <div className="shrink-0">
        <Image
          src={currentUser?.image || defaultImage}
          alt="Avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>

      <div className="">
        {currentUser ? (
          <InputGroup>
            <FloatingLabel label="Écrivez votre commentaire...">
              <Form.Control
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleClick())}
                placeholder="Écrivez votre commentaire..."
              />
            </FloatingLabel>
            <Button variant="primary" onClick={handleClick}>
              Envoyer
            </Button>
          </InputGroup>
        ) : (
          <Button variant="primary" onClick={openAuthModal} className="w-full">
            Connectez-vous pour commenter
          </Button>
        )}
      </div>
    </div>
  );
};

export default WriteComment;