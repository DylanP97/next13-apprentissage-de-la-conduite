import { fireEvent, render, screen } from "@testing-library/react";
import ConnexionClient from "./ConnexionClient";
import { signIn } from "next-auth/react";

jest.mock("next-auth/react");

jest.mock("next/navigation");

jest.mock("react-hot-toast");

describe("@ConnexionClient", () => {
  it("should render @ConnexionClient component correctly", () => {
    const { container } = render(
      <ConnexionClient isSignIn={false} state={jest.fn()} />,
    );
    expect(container.childNodes.length).toEqual(1);
  });

  describe("@isSignIn", () => {
    it("should render component with @isSignIn=true", () => {
      render(<ConnexionClient isSignIn={true} state={jest.fn()} />);
      expect(screen.getByText("Adresse e-mail")).toBeInTheDocument();
      expect(screen.getByText("Mot de passe")).toBeInTheDocument();
      expect(screen.getByText("Se connecter")).toBeInTheDocument();
      expect(screen.getByText("Continuer avec Google")).toBeInTheDocument();
    });
  });

  describe("@state", () => {
    it("should trigger @state", () => {
      const mockStateFunc = jest.fn();
      render(<ConnexionClient isSignIn={true} state={mockStateFunc} />);

      fireEvent.click(screen.getByText("Pas Encore Inscrit ? S'Inscrire"));
      expect(mockStateFunc).toHaveBeenCalledWith(false);
    });
  });

  it("should update @email field", () => {
    render(<ConnexionClient isSignIn={true} state={jest.fn()} />);

    const emailInput = screen.getAllByRole("textbox")[0];
    expect(emailInput).toHaveAttribute("placeholder", "current");
    expect(emailInput).toHaveAttribute("name", "email");

    fireEvent.change(emailInput, { target: { value: "test" } });
    const emailInputUpdate = screen.getAllByRole("textbox")[0];

    expect(emailInputUpdate).toHaveValue("test");
  });

  it("should show password field value", () => {
    render(<ConnexionClient isSignIn={true} state={jest.fn()} />);

    const showImageIcon = screen.getAllByRole("img")[0];
    fireEvent.click(showImageIcon);

    expect(screen.getAllByRole("img")[0]).toHaveClass("password-eye");
  });

  it("should handle connect via google", () => {
    render(<ConnexionClient isSignIn={true} state={jest.fn()} />);

    fireEvent.click(screen.getByText("Continuer avec Google"));
    expect(signIn).toHaveBeenCalledTimes(1);
  });

  it("should navigate to forgot-password", () => {
    global.window = Object.create(window);
    const url = "http://dummy.com";
    Object.defineProperty(window, "location", {
      value: {
        href: url,
      },
      writable: true,
    });

    render(<ConnexionClient isSignIn={true} state={jest.fn()} />);

    fireEvent.click(screen.getByText("J'ai oublié mon mot de passe"));
    expect(window.location.href).toBe("/forgot-password");
  });

  it("should navigate to home", () => {
    global.window = Object.create(window);
    const url = "http://dummy.com";
    Object.defineProperty(window, "location", {
      value: {
        href: url,
      },
      writable: true,
    });
    render(<ConnexionClient isSignIn={true} state={jest.fn()} />);

    fireEvent.click(screen.getByText("Retour à la page d'accueil"));
    expect(window.location.href).toBe("/");
  });
});
