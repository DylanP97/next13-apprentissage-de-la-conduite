import Image from "next/image";
import React from "react";
import { Form } from "react-bootstrap";
import { FloatingLabel, InputGroup, Button } from "react-bootstrap";

interface WriteCommentProps {
  currentUser: any;
}

const WriteComment: React.FC<WriteCommentProps> = ({ currentUser }) => {
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
        <Image src={currentUser.image} alt="" height={35} width={35} />
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
              // onChange={(event) => state(event.target.value)}
            />
          </FloatingLabel>
          <InputGroup.Text id="basic-addon1">Envoyer</InputGroup.Text>
        </InputGroup>
        <Form.Text className="email error">
          {/* {errorMessages.email && <span className="error-message">{errorMessages.password}</span>} */}
        </Form.Text>
      </Form.Group>
    </div>
  );
};

export default WriteComment;
