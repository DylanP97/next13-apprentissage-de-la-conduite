import mockAxios from "jest-mock-axios";
import { fireEvent, render, screen } from "@testing-library/react";
import NavBar from "../NavBar";
import { signOut } from "next-auth/react";

const mockRouterPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: mockRouterPush,
    };
  },
}));

jest.mock("next-auth/react");

describe("@NavBar", () => {
  const baseNavBarText = ["Apprentissage de la Conduite"];

  it("should render @NavBar component correctly", () => {
    render(<NavBar currentUser={null} />);

    baseNavBarText.forEach((text: string) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
    expect(screen.getByText("Connexion")).toBeInTheDocument();
    expect(() => screen.getByText("Se déconnecter")).toThrow();
  });

  it("should signOut", () => {
    render(
      <NavBar
        currentUser={{ id: "1", isSubscribed: true, isAdmin: false }}
      />,
    );

    fireEvent.click(screen.getByText("Se déconnecter"));
    expect(signOut).toHaveBeenCalledTimes(1);
  });

  describe("@isSubscribed", () => {
    it("should render NavBar for subscribed user", () => {
      render(
        <NavBar
          currentUser={{ id: "1234", isSubscribed: true, isAdmin: false }}
        />,
      );

      expect(screen.getByText("Profil")).toHaveAttribute("href", "/profil/1234");
      expect(screen.getByText("Quiz")).toHaveAttribute("href", "/quiz");
      expect(screen.getByText("Contact")).toHaveAttribute("href", "/contact");
      expect(screen.getByText("Se déconnecter")).toBeInTheDocument();
    });
  });

  describe("@isAdmin", () => {
    afterEach(() => {
      mockAxios.mockRestore();
    });

    const adminNavBarLinks = {
      "Gestion des articles": "/admin-articles",
      "Gestion des élèves": "/admin-eleves",
      "Gestion des questions": "/admin-questions",
    };

    it("should render NavBar for @isAdmin", () => {
      render(
        <NavBar
          currentUser={{ id: "1", isSubscribed: false, isAdmin: true }}
        />,
      );

      const adminDropdown = screen.getByText("Admin");
      fireEvent.click(adminDropdown);
      Object.entries(adminNavBarLinks).forEach(([key, value]) => {
        const element = screen.getByText(key);
        expect(element).toBeInTheDocument();
        expect(element).toHaveAttribute("href", value);
      });
    });

    it("should trigger createBlog and navigate to admin-edition", () => {
      render(
        <NavBar
          currentUser={{ id: "1", isSubscribed: false, isAdmin: true }}
        />,
      );

      const adminDropdown = screen.getByText("Admin");
      fireEvent.click(adminDropdown);

      const newArticleButton = screen.getByText("Écrire un nouvel article");
      fireEvent.click(newArticleButton);
      mockAxios.mockResponse({ data: { blogId: "1234" } });
      expect(mockRouterPush).toHaveBeenCalledWith("/admin-edition/1234");
    });

    it("should throw error for createBlog if post fails", () => {
      render(
        <NavBar
          currentUser={{ id: "1", isSubscribed: false, isAdmin: true }}
        />,
      );

      const adminDropdown = screen.getByText("Administrateur");
      fireEvent.click(adminDropdown);

      const newArticleButton = screen.getByText("Écrire un nouvel article");
      fireEvent.click(newArticleButton);
      mockAxios.mockError(new Error("Post request failed"));
      expect(mockRouterPush).toHaveBeenCalledWith("/admin-edition/1234");
    });
  });

  describe("@userId", () => {
    it("should render NavBar with Profil link including userId ", () => {
      render(
        <NavBar
          currentUser={{ id: "1234", isSubscribed: true, isAdmin: false }}
        />,
      );
      const profileLink = screen.getByText("Profil");
      expect(profileLink).toHaveAttribute("href", "/profil/1234");
    });
  });
});
