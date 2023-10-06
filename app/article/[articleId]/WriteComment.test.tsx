import React from "react";
import { render, screen } from "@testing-library/react";
import WriteComment from "./WriteComment";
import carImage from "@/public/images/car.png";

describe("@WriteComment", () => {
  it("should renders @WriteComment component correctly", () => {
    render(
      <WriteComment
        currentUser={{
          image: carImage.src,
          firstName: "test first name",
        }}
      />
    );

    expect(screen.getByText("Écrivez votre commentaire")).toBeInTheDocument();
  });
});
