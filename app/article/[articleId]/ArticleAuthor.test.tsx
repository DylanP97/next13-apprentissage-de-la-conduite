import React from "react";
import { render, screen } from "@testing-library/react";
import ArticleAuthor from "./ArticleAuthor";
import carImage from "@/public/images/car.png";

describe("@ArticleAuthor", () => {
  const author = {
    name: "John Doe",
    image: carImage.src,
  };

  it("should renders component with author name", () => {
    render(
      <ArticleAuthor
        author={{
          name: "test name",
          image: carImage.src,
        }}
      />
    );
    expect(
      screen.getByText("Écrit par test name - Moniteur depuis ...")
    ).toBeInTheDocument();
  });

  it("should renders component with author firstName", () => {
    render(
      <ArticleAuthor
        author={{
          firstName: "test name",
          image: carImage.src,
        }}
      />
    );
    expect(
      screen.getByText("Écrit par test name - Moniteur depuis ...")
    ).toBeInTheDocument();
  });
});
