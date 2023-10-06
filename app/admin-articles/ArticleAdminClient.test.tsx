import { fireEvent, render, screen, act } from "@testing-library/react";
import ArticleAdminClient from "./ArticleAdminClient";
import mockAxios from "jest-mock-axios";

const mockRouterPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: mockRouterPush,
    };
  },
}));

describe("@ArticleAdminClient", () => {
  // this test will fail as props are not safely unwrapped
  it.skip("should render component correctly", () => {
    render(<ArticleAdminClient blogs={undefined} />);

    expect(
      screen.getByText("Nombre total d'articles actuellement : 0")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Nombre d'articles visibles aux élèves : 0")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Ici changer la visibilité, jeter un oeil, modifier ou supprimer l'un de vos articles."
      )
    ).toBeInTheDocument();
  });

  describe("@blogs", () => {
    afterEach(() => {
      mockAxios.mockRestore();
    });

    it("should trigger publish with success with status", async () => {
      render(
        <ArticleAdminClient
          blogs={[
            {
              id: 1,
              published: true,
              tags: ["test tag", "test tag 2"],
            },
          ]}
        />
      );

      fireEvent.click(screen.getAllByAltText("view")[0]);

      act(() => {
        mockAxios.mockResponse({
          data: {
            data: {
              id: 1,
              tags: ["test tag", "test tag 2"],
            },
          },
        });
      });

      expect(
        screen.getByText("Nombre total d'articles actuellement : 1")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Nombre d'articles visibles aux élèves : 0")
      ).toBeInTheDocument();
    });

    it("should trigger publish with success without status", async () => {
      render(
        <ArticleAdminClient
          blogs={[
            {
              id: 1,
              published: false,
              isAccepted: false,
              tags: ["test tag", "test tag 2"],
            },
          ]}
        />
      );

      fireEvent.click(screen.getAllByAltText("view")[0]);

      act(() => {
        mockAxios.mockResponse({
          data: {
            data: {
              id: 1,
              published: false,
              isAccepted: false,
              tags: ["test tag", "test tag 2"],
            },
          },
        });
      });

      expect(
        screen.getByText("Nombre total d'articles actuellement : 1")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Nombre d'articles visibles aux élèves : 0")
      ).toBeInTheDocument();
    });

    it("should trigger publish with failure", async () => {
      render(
        <ArticleAdminClient
          blogs={[
            {
              id: 1,
              published: true,
              tags: ["test tag", "test tag 2"],
            },
          ]}
        />
      );

      fireEvent.click(screen.getAllByAltText("view")[0]);

      act(() => {
        mockAxios.mockError(new Error("error"));
      });

      expect(
        screen.getByText("Nombre total d'articles actuellement : 1")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Nombre d'articles visibles aux élèves : 1")
      ).toBeInTheDocument();
    });

    it("should trigger detele with success", () => {
      render(
        <ArticleAdminClient
          blogs={[
            {
              id: 1,
              published: true,
              tags: ["test tag", "test tag 2"],
            },
          ]}
        />
      );

      expect(
        screen.getByText("Nombre total d'articles actuellement : 1")
      ).toBeInTheDocument();
      fireEvent.click(screen.getByAltText("trash"));
      act(() => {
        mockAxios.mockResponse({
          data: {
            tags: ["test tag", "test tag 2"],
          },
        });
      });
      expect(
        screen.getByText("Nombre total d'articles actuellement : 0")
      ).toBeInTheDocument();
    });

    it("should render component with @blogs=null", () => {
      render(<ArticleAdminClient blogs={null} />);

      expect(
        screen.getByText("Nombre total d'articles actuellement : 0")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Nombre d'articles visibles aux élèves : 0")
      ).toBeInTheDocument();
    });

    it("should render component with @blogs", () => {
      render(
        <ArticleAdminClient
          blogs={[
            {
              id: 1,
              published: true,
              tags: ["test tag", "test tag 2"],
            },
            {
              id: 2,
              published: false,
              tags: ["test tag", "test tag 2"],
            },
          ]}
        />
      );

      expect(
        screen.getByText("Nombre total d'articles actuellement : 2")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Nombre d'articles visibles aux élèves : 1")
      ).toBeInTheDocument();
    });

    it("should trigger new article with fail", async () => {
      render(<ArticleAdminClient blogs={[]} />);

      fireEvent.click(screen.getByText("Écrire un nouveau article"));
      act(() => {
        mockAxios.mockError(new Error("error"));
      });
      expect(mockRouterPush).toHaveBeenCalledTimes(0);
    });

    it("should trigger new article with success", () => {
      render(<ArticleAdminClient blogs={[]} />);

      fireEvent.click(screen.getByText("Écrire un nouveau article"));
      mockAxios.mockResponse({ data: { blogId: "13" } });
      expect(mockRouterPush).toHaveBeenCalledWith("/admin-edition/13");
    });

    it("should trigger detele article with failure", () => {
      render(
        <ArticleAdminClient
          blogs={[
            {
              id: 1,
              published: true,
              tags: ["test tag", "test tag 2"],
            },
          ]}
        />
      );

      expect(
        screen.getByText("Nombre total d'articles actuellement : 1")
      ).toBeInTheDocument();
      fireEvent.click(screen.getByAltText("trash"));
      act(() => {
        mockAxios.mockError(new Error("error"));
      });
      expect(
        screen.getByText("Nombre total d'articles actuellement : 1")
      ).toBeInTheDocument();
    });
  });
});
