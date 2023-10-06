import { fireEvent, render, screen } from "@testing-library/react";
import ArticleClient from "./ArticleClient";
import carImage from "@/public/images/car.png";

describe("@ArticleClient", () => {
  const realLocation = window.location;

  beforeAll(() => {
    (window as any).location = undefined;
    delete (window as any).location;
    window.location = { ...realLocation, assign: jest.fn() };
  });

  afterAll(() => {
    window.location = realLocation;
  });

  it("should render @ArticleClient component correctly", () => {
    render(<ArticleClient blog={undefined} />);
    expect(screen.getByText("Retour à l'accueil")).toBeInTheDocument();
  });

  describe("@blog", () => {
    it("should render component with @blog=null", () => {
      render(<ArticleClient blog={undefined} />);
      expect(screen.getByText("Retour à l'accueil")).toBeInTheDocument();
    });

    it("should render component with @blog", () => {
      render(
        <ArticleClient
          blog={{
            id: "test id",
            title: "test title",
            tags: ["test tag"],
          }}
        />,
      );
      expect(screen.getByText("#test tag")).toBeInTheDocument();
      expect(screen.getByText("test title")).toBeInTheDocument();
    });

    it("should render component with @blog with image", () => {
      render(
        <ArticleClient
          blog={{
            imageUrl: carImage.src,
          }}
        />,
      );
      expect(screen.getByRole("img")).toHaveAttribute(
        "src",
        "/_next/image?url=%2Fimg.jpg&w=3840&q=75",
      );
    });
  });

  describe("@isAdmin", () => {
    it("should render component with @isAdmin=true", () => {
      render(<ArticleClient blog={undefined} isAdmin={true} />);

      fireEvent.click(screen.getByText("Modifier l'article"));
      expect(window.location.assign).toHaveBeenCalledWith(
        "/admin-edition/undefined",
      );
    });
  });

  it("should redirect to home", () => {
    render(<ArticleClient blog={undefined} />);

    fireEvent.click(screen.getByText("Retour à l'accueil"));
    expect(window.location.assign).toHaveBeenCalledWith("/");
  });

  it("should redirect to home", () => {
    render(<ArticleClient blog={undefined} />);

    fireEvent.click(screen.getByText("Retour à l'accueil"));
    expect(window.location.assign).toHaveBeenCalledWith("/");
  });
});
