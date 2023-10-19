import Image from "next/image";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { FloatingLabel, InputGroup, Button } from "react-bootstrap";
import defaultImage from '@/public/images/default.png';
import axios from "axios";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

interface WriteCommentProps {
  currentUser: any;
}

const WriteComment: React.FC<WriteCommentProps> = ({ currentUser }) => {
  const [content, setContent] = useState("");

  let params = useParams();

  const articleId = params?.articleId

  const postComment = () => {
    const data = {
      commenterId: currentUser && currentUser.id,
      content: content,
      blogId: articleId,
    }

    axios.post(`/api/comment`, { data })
    .then(() => {
      toast.success("Commentaire ajouté");
    })
    .catch((error) => {
      toast.error("Il y a eu une erreur lors de l'ajout du commentaire");
    });
  }


  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        fontStyle: "italic",
        gap: "1rem",
        width: "100%",
      }}
    >
      <div
        style={{
          borderRadius: "100%",
          overflow: "hidden",
        }}
      >
        <Image src={currentUser && currentUser.image || defaultImage} alt="" height={35} width={35} />
      </div>
      <Form.Group
        style={{
          width: "100%",
        }}
      >
        <InputGroup>
          <FloatingLabel label={"Écrivez votre commentaire"}>
            <Form.Control
              required
              type="text"
              name="comment"
              id="comment"
              style={{
                width: "100%",
              }}
              onChange={(event) => setContent(event.target.value)}
            />
          </FloatingLabel>
          <InputGroup.Text className="write-comment-submit" onClick={() => postComment()} id="basic-addon1">Envoyer</InputGroup.Text>
        </InputGroup>
      </Form.Group>
    </div>
  );
};

export default WriteComment;
