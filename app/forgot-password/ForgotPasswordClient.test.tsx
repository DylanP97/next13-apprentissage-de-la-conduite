import { fireEvent, render, screen } from "@testing-library/react";
import ForgotPasswordClient from "./ForgotPasswordClient";
import mockAxios from "jest-mock-axios";

describe("@ForgotPasswordClient", () => {
  afterEach(() => {
    mockAxios.mockRestore();
  });

  it("should render component correctly", () => {
    render(<ForgotPasswordClient />);

    expect(
      screen.getByText("Réinitialiser votre mot de passe"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Envoyer un e-mail de réinitialisation du mot de passe"),
    ).toBeInTheDocument();

    const emailInput = screen.getByRole("textbox");
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("type", "email");
    expect(emailInput).toHaveValue("");
  });

  it("should trigger email change with success", () => {
    render(<ForgotPasswordClient />);

    const emailInput = screen.getByRole("textbox");
    fireEvent.change(emailInput, { target: { value: "test@email.com" } });
    fireEvent.click(
      screen.getByText("Envoyer un e-mail de réinitialisation du mot de passe"),
    );
    mockAxios.mockResponse({ data: { message: "testMessage" } });
    expect(mockAxios.post).toHaveBeenCalledWith("/api/user/forgot-password", {
      email: "test@email.com",
    });
  });

  it("should trigger email change with failure", () => {
    render(<ForgotPasswordClient />);

    const emailInput = screen.getByRole("textbox");
    fireEvent.change(emailInput, { target: { value: "test@email.com" } });
    fireEvent.click(
      screen.getByText("Envoyer un e-mail de réinitialisation du mot de passe"),
    );
    mockAxios.mockError(new Error("Post request failed"));
  });

  it("should navigate to home", () => {
    render(<ForgotPasswordClient />);

    fireEvent.click(screen.getByText("Retourner à l'accueil"));
    expect(window.location.href).toBe("http://localhost/");
  });
});
