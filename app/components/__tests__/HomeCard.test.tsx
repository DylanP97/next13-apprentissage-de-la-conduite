import { fireEvent, render, screen } from "@testing-library/react";
import { HomeCard } from "../HomeCard";
import carImage from "@/public/images/car.png";

const mockRouterPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: mockRouterPush,
    };
  },
}));

describe("@HomeCard", () => {
  it("should render @HomeCard component correctly", () => {
    render(
      <HomeCard
        blog={{
          id: "1",
          imageUrl: carImage.src,
          title: "test title",
          tags: ["a", "b"],
          createdAt: "12-12-2020",
        }}
      />,
    );

    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "/_next/image?url=%2Fimg.jpg&w=2048&q=75",
    );
    expect(screen.getByText("test title")).toBeInTheDocument();
    expect(screen.getByText("#a")).toBeInTheDocument();
    expect(screen.getByText("#b")).toBeInTheDocument();
    expect(screen.getByText("Le sam. 12 déc. 2020")).toBeInTheDocument();
  });

  describe("@HomeCard", () => {
    it("should render @HomeCard component correctly", () => {
      render(
        <HomeCard
          blog={{
            id: "",
            imageUrl: "",
            title: "",
            tags: ["a", "b"],
            createdAt: "",
          }}
        />,
      );
      expect(screen.getByRole("img")).toHaveAttribute(
        "src",
        "/_next/image?url=%2Fimg.jpg&w=2048&q=75",
      );
    });
  });

  describe("@HomeCard", () => {
    it("should render @HomeCard component correctly", () => {
      render(
        <HomeCard
          blog={{
            id: "1",
            imageUrl: "",
            title: "",
            tags: [],
            createdAt: "",
          }}
        />,
      );

      fireEvent.click(screen.getByTestId("blog-item"));
      expect(mockRouterPush).toHaveBeenCalledTimes(1);
      expect(mockRouterPush).toBeCalledWith("/article/1");
    });
  });
});
