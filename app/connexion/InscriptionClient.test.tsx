import { fireEvent, render, screen } from "@testing-library/react";
import InscriptionClient from "./InscriptionClient";
import { signIn } from "next-auth/react";

jest.mock("next-auth/react");

jest.mock("next/navigation");

jest.mock("react-hot-toast");

describe("@InscriptionClient", () => {
  it("should render @InscriptionClient component correctly", () => {
    const { container } = render(
      <InscriptionClient isSignIn={false} state={jest.fn()} />,
    );
    expect(container.childNodes.length).toEqual(1);
  });

  describe("@isSignIn", () => {
    it("should render component with @isSignIn=true", () => {
      const { container } = render(
        <InscriptionClient isSignIn={true} state={jest.fn()} />,
      );
      expect(container.childNodes.length).toEqual(1);
    });

    it("should render component with @isSignIn=false", () => {
      render(<InscriptionClient isSignIn={false} state={jest.fn()} />);
      expect(screen.getByText("Adresse email")).toBeInTheDocument();
      expect(screen.getByText("Mot de passe")).toBeInTheDocument();
      expect(
        screen.getByText("Vous avez déjà un compte ? Connectez-vous !"),
      ).toBeInTheDocument();
      expect(screen.getByText("Continuer avec Google")).toBeInTheDocument();
    });
  });

  describe("@state", () => {
    it("should trigger @state", () => {
      const mockStateFunc = jest.fn();
      render(<InscriptionClient isSignIn={false} state={mockStateFunc} />);

      fireEvent.click(
        screen.getByText("Vous avez déjà un compte ? Connectez-vous !"),
      );
      expect(mockStateFunc).toHaveBeenCalledWith(true);
    });
  });

  it("should update @firstName field", () => {
    render(<InscriptionClient isSignIn={false} state={jest.fn()} />);

    const firstNameInput = screen.getAllByRole("textbox")[0];
    expect(firstNameInput).toHaveAttribute("placeholder", "current");
    expect(firstNameInput).toHaveAttribute("name", "firstName");

    fireEvent.change(firstNameInput, { target: { value: "test" } });
    const firstNameInputUpdate = screen.getAllByRole("textbox")[0];

    expect(firstNameInputUpdate).toHaveValue("test");
  });

  it("should show password field value", () => {
    render(<InscriptionClient isSignIn={false} state={jest.fn()} />);

    const showImageIcon = screen.getAllByRole("img")[1];
    fireEvent.click(showImageIcon);

    expect(screen.getAllByRole("img")[1]).toHaveClass("password-eye");
  });

  it("should handle connect via google", () => {
    render(<InscriptionClient isSignIn={false} state={jest.fn()} />);

    fireEvent.click(screen.getByText("Continuer avec Google"));
    expect(signIn).toHaveBeenCalledTimes(1);
  });

  it("should signin with google", () => {
    render(<InscriptionClient isSignIn={false} state={jest.fn()} />);

    fireEvent.click(screen.getByText("Continuer avec Google"));
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
    render(<InscriptionClient isSignIn={false} state={jest.fn()} />);

    fireEvent.click(screen.getByText("Retour à l'accueil"));
    expect(window.location.href).toBe("/");
  });
});
