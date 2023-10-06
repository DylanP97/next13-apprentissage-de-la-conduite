import React from "react";
import { render, screen } from "@testing-library/react";
import Comment from "./Comment";
import carImage from "@/public/images/car.png";

describe("@Comment", () => {
  it("should renders @Comment component correctly", () => {
    render(
      <Comment
        commenter={{
          image: carImage.src,
          firstName: "test first name",
        }}
        content={"test content"}
        createdAt={new Date()}
      />
    );

    expect(
      screen.getByText("test first name - Il y a quelques secondes")
    ).toBeInTheDocument();
    expect(screen.getByText("test content")).toBeInTheDocument();
  });

  it("should renders component with name", () => {
    render(
      <Comment
        commenter={{
          image: carImage.src,
          name: "test name",
        }}
        content={"test content"}
        createdAt={new Date()}
      />
    );

    expect(
      screen.getByText("test name - Il y a quelques secondes")
    ).toBeInTheDocument();
    expect(screen.getByText("test content")).toBeInTheDocument();
  });
});
