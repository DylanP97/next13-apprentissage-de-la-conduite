import React from "react";
import { render, screen } from "@testing-library/react";
import ArticleComments from "./ArticleComments";
import carImage from "@/public/images/car.png";

describe("@ArticleComments", () => {
  it("should renders @ArticleComments component correctly", () => {
    render(
      <ArticleComments
        commentsList={[]}
        currentUser={{
          id: 1,
          image: carImage.src,
        }}
      />
    );

    expect(screen.getByText("0 commentaires")).toBeInTheDocument();
  });

  it("should renders component with 2 comments", () => {
    render(
      <ArticleComments
        commentsList={[
          {
            id: 1,
            commenter: {
              image: carImage.src,
            },
          },
          {
            id: 2,
            commenter: {
              image: carImage.src,
            },
          },
        ]}
        currentUser={{
          id: 1,
          image: carImage.src,
        }}
      />
    );

    expect(screen.getByText("2 commentaires")).toBeInTheDocument();
  });
});
