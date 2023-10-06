import { fireEvent, render, screen } from "@testing-library/react";
import { TagsEditor } from "../TagsEditor";

const mockBlogs = [
  {
    title: "test",
    tags: ["a", "b"],
  },
  {
    title: "test2",
    tags: ["c", "d"],
  },
];

describe("@TagsEditor", () => {
  it("should render @TagsEditor component correctly", () => {
    render(<TagsEditor />);
    expect(screen.getByTestId("TagsEditor")).toBeEmptyDOMElement();
  });

  describe("@blogs", () => {
    it("should render component with @blogs=undefined", () => {
      render(<TagsEditor blogs={undefined} />);
      expect(screen.getByTestId("TagsEditor")).toBeEmptyDOMElement();
    });

    it("should render component with @blogs=null", () => {
      render(<TagsEditor blogs={null} />);
      expect(screen.getByTestId("TagsEditor")).toBeEmptyDOMElement();
    });

    it("should render component with @blogs as expected type", () => {
      const mockBlogs = [
        {
          title: "test",
          tags: ["a", "b"],
        },
        {
          title: "test2",
          tags: ["c", "d"],
        },
      ];

      render(<TagsEditor blogs={mockBlogs} />);
      expect(() => screen.getByTestId("TagsEditor-removeTag")).toThrow();
      expect(screen.getAllByTestId("TagsEditor-addTag")).toHaveLength(4);
    });
  });

  describe("@blogs", () => {
    it("should render component with @blogs=undefined", () => {
      render(<TagsEditor blogs={undefined} />);
      expect(screen.getByTestId("TagsEditor")).toBeEmptyDOMElement();
    });

    it("should render component with @blogs=null", () => {
      render(<TagsEditor blogs={null} />);
      expect(screen.getByTestId("TagsEditor")).toBeEmptyDOMElement();
    });

    it("should render component with @blogs as expected type", () => {
      render(<TagsEditor blogs={mockBlogs} />);
      expect(() => screen.getByTestId("TagsEditor-removeTag")).toThrow();
      expect(screen.getAllByTestId("TagsEditor-addTag")).toHaveLength(4);
    });
  });

  describe("@tags", () => {
    it("should render component with @tags=undefined", () => {
      render(<TagsEditor tags={undefined} />);
      expect(screen.getByTestId("TagsEditor")).toBeEmptyDOMElement();
    });

    it("should render component with @tags=null", () => {
      render(<TagsEditor tags={null} />);
      expect(screen.getByTestId("TagsEditor")).toBeEmptyDOMElement();
    });

    it("should render component with @tags as expected type", () => {
      render(<TagsEditor tags={["a", "b"]} />);
      expect(screen.getByTestId("TagsEditor")).toBeEmptyDOMElement();
    });

    it("should render component with @tags as and @blogs", () => {
      render(<TagsEditor tags={["a", "b"]} blogs={mockBlogs} />);

      const removeTags = screen.getAllByTestId("TagsEditor-removeTag");
      const addTags = screen.getAllByTestId("TagsEditor-addTag");

      expect(removeTags[0]).toHaveTextContent("#a ✖");
      expect(removeTags[1]).toHaveTextContent("#b ✖");
      expect(removeTags).toHaveLength(2);
      expect(addTags).toHaveLength(2);
    });
  });

  describe("@state", () => {
    // it("should render component with @state=undefined", () => {
    //   try {
    //     render(<TagsEditor state={undefined} blogs={mockBlogs} tags={["e"]} />);
    //     const addTags = screen.getAllByTestId("TagsEditor-addTag");
    //     fireEvent.click(addTags[0]);
    //   } catch (e) {
    //     console.log(e);
    //   }
    // });

    // it("should render component with @state=null", () => {
    //   try {
    //     render(<TagsEditor state={null} tags={["a", "b"]} blogs={mockBlogs} />);
    //     const removeTags = screen.getAllByTestId("TagsEditor-removeTag");
    //     fireEvent.click(removeTags[0]);
    //   } catch (e) {
    //     console.log(e);
    //   }
    // });

    it("should render component with @state trigger add tag", () => {
      const mockState = jest.fn();
      render(<TagsEditor state={mockState} blogs={mockBlogs} tags={["e"]} />);
      const addTags = screen.getAllByTestId("TagsEditor-addTag");
      fireEvent.click(addTags[0]);
      expect(mockState).toBeCalled();
    });

    it("should render component with @state trigger remove tag", () => {
      const mockState = jest.fn();
      render(
        <TagsEditor state={mockState} tags={["a", "b"]} blogs={mockBlogs} />,
      );
      const removeTags = screen.getAllByTestId("TagsEditor-removeTag");
      fireEvent.click(removeTags[0]);
      expect(mockState).toBeCalled();
    });
  });

  describe("@blogtags", () => {
    it("should render component with @blogtags=undefined", () => {
      render(<TagsEditor blogtags={undefined} />);
      expect(() => screen.getByRole("textbox")).toThrow();
    });

    it("should render component with @blogtags=null", () => {
      render(<TagsEditor blogtags={null} />);
      expect(() => screen.getByRole("textbox")).toThrow();
    });

    it("should render component with @blogtags", () => {
      const mockState = jest.fn();
      render(<TagsEditor blogtags={["a", "b"]} state={mockState} />);
      expect(mockState).toBeCalled();

      const input = screen.getByRole("textbox");
      expect(input).toHaveValue("");
      expect(input).toHaveAttribute("placeholder", "Ajouter un nouveau tag");
    });

    it("should render component with @blogtags and trigger new tag on keyDown", () => {
      const mockState = jest.fn();
      render(<TagsEditor blogtags={["a", "b"]} state={mockState} />);
      const input = screen.getByRole("textbox");
      fireEvent.change(input, { target: { value: "c" } });

      expect(input).toHaveValue("c");
      fireEvent.keyDown(input, { key: "Enter", keyCode: 13 });
      expect(mockState).toBeCalled();
    });

    it("should render component with @blogtags and trigger new tag on click", () => {
      const mockState = jest.fn();
      render(<TagsEditor blogtags={["a", "b"]} state={mockState} />);
      const input = screen.getByRole("textbox");
      fireEvent.change(input, { target: { value: "c" } });

      expect(input).toHaveValue("c");
      fireEvent.click(screen.getByTestId("TagsEditor-addNewTag"));

      expect(mockState).toBeCalled();
    });
  });
});
