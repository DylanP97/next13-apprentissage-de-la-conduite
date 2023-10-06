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

const subscriberNavBarLinks = {
  Accueil: "/",
  Profil: "/profil/",
  Quiz: "/quiz",
  Contact: "/contact",
};

describe("@NavBar", () => {
  const baseNavBarText = [
    "Apprentissage de la Conduite et de la Sécurité Routière",
    "Se déconnecter",
  ];

  it("should render @NavBar component correctly", () => {
    render(<NavBar isSubscribed={false} isAdmin={false} userId="" />);

    baseNavBarText.forEach((text: string) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
    expect(() => screen.getByText("Administrateur")).toThrow();
    Object.keys(subscriberNavBarLinks).forEach((key) => {
      expect(() => screen.getByText(key)).toThrow();
    });
  });

  it("should signOut", () => {
    render(<NavBar isSubscribed={false} isAdmin={false} userId="" />);

    fireEvent.click(screen.getByText("Se déconnecter"));
    expect(signOut).toHaveBeenCalledTimes(1);
  });

  describe("@isSubscribed", () => {
    it("should render NavBar for subscribed user", () => {
      render(<NavBar isSubscribed={true} isAdmin={false} userId="" />);

      Object.entries(subscriberNavBarLinks).forEach(([key, value]) => {
        const element = screen.getByText(key);
        expect(element).toBeInTheDocument();
        expect(element).toHaveAttribute("href", value);
      });
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
      render(<NavBar isSubscribed={false} isAdmin={true} userId="" />);

      const adminDropdown = screen.getByText("Administrateur");
      fireEvent.click(adminDropdown);
      Object.entries(adminNavBarLinks).forEach(([key, value]) => {
        const element = screen.getByText(key);
        expect(element).toBeInTheDocument();
        expect(element).toHaveAttribute("href", value);
      });
    });

    it("should trigger createBlog and navigate to admin-edition", () => {
      render(<NavBar isSubscribed={false} isAdmin={true} userId="" />);

      const adminDropdown = screen.getByText("Administrateur");
      fireEvent.click(adminDropdown);

      const newArticleButton = screen.getByText("Écrire un nouvel article");
      fireEvent.click(newArticleButton);
      mockAxios.mockResponse({ data: { blogId: "1234" } });
      expect(mockRouterPush).toHaveBeenCalledWith("/admin-edition/1234");
    });

    it("should throw error for createBlog if post fails", () => {
      render(<NavBar isSubscribed={false} isAdmin={true} userId="" />);

      const adminDropdown = screen.getByText("Administrateur");
      fireEvent.click(adminDropdown);

      const newArticleButton = screen.getByText("Écrire un nouvel article");
      fireEvent.click(newArticleButton);
      mockAxios.mockError(new Error("Post request failed"));
      expect(mockRouterPush).toHaveBeenCalledWith("/admin-edition/1234");
    });
  });

  describe("@userId", () => {
    it("should render NavBar with Profil like including userId ", () => {
      render(<NavBar isSubscribed={true} isAdmin={false} userId="1234" />);
      const profileLink = screen.getByText("Profil");
      expect(profileLink).toHaveAttribute("href", "/profil/1234");
    });
  });
});
