import { fireEvent, render, screen } from "@testing-library/react";
import HomePage from "../HomePage";
import { User } from "@prisma/client";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
}));

const user: Partial<User> = {
  name: "testName",
};

const homePageBlogGridId = "HomePage-blog-grid";

describe("@HomePage", () => {
  it("should render @HomePage component correctly", () => {
    render(<HomePage currentUser={user as User} blogs={undefined} />);
    expect(screen.getByText(`Bonjour ${user.name}`)).toBeInTheDocument();
  });

  describe("@blogs", () => {
    it("should render component with @blogs=null", () => {
      render(<HomePage currentUser={user as User} blogs={null} />);
      expect(screen.queryByTestId(homePageBlogGridId)).not.toBeInTheDocument();
    });

    it("should render component with @blogs=null", () => {
      render(<HomePage currentUser={user as User} blogs={null} />);
      expect(screen.queryByTestId(homePageBlogGridId)).not.toBeInTheDocument();
    });

    it("should render component with @blogs=[]", () => {
      render(<HomePage currentUser={user as User} blogs={[]} />);
      expect(screen.getByText("Il n'y a pas d'articles")).toBeInTheDocument();
    });
    it("should render component with @blogs", () => {
      const mockBlogs = [
        {
          title: "test",
        },
        {
          title: "test2",
          tags: ["c", "d"],
        },
        {
          title: "test3",
          tags: ["e", "f"],
        },
      ];

      render(<HomePage currentUser={user as User} blogs={mockBlogs} />);

      const addTags = screen.getAllByTestId("TagsEditor-addTag");
      expect(addTags).toHaveLength(4);
      expect(screen.getByText("test")).toBeInTheDocument();
      expect(screen.getByText("test2")).toBeInTheDocument();
      expect(screen.getByText("test3")).toBeInTheDocument();

      fireEvent.click(addTags[0]);
    });
  });
});
