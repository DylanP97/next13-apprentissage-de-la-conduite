import { fireEvent, render, screen } from "@testing-library/react";
import ResetPasswordClient from "./ResetPasswordClient";
import mockAxios from "jest-mock-axios";
import toast from "react-hot-toast";

const mockRouterPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: mockRouterPush,
    };
  },
  useParams() {
    return {
      token: "123",
    };
  },
}));

jest.mock("react-hot-toast");

describe("@ResetPasswordClient", () => {
  it("should render @ResetPasswordClient component correctly", () => {
    render(<ResetPasswordClient />);
    expect(
      screen.getByText("Valider mon nouveau mot de passe"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Annuler et retourner à l'accueil"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Confirmer votre nouveau mot de passe"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Écrivez votre nouveau mot de passe"),
    ).toBeInTheDocument();
  });

  it("should set passwords", () => {
    render(<ResetPasswordClient />);

    const passwordInput = screen.getByTestId("password-input");
    const passwordConfirmInput = screen.getByTestId("password-confirm-input");

    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(passwordConfirmInput, { target: { value: "password2" } });

    const seeInputs = screen.getAllByAltText("eye");
    fireEvent.click(seeInputs[0]);
    fireEvent.click(seeInputs[1]);

    expect(screen.getByTestId("password-input")).toHaveValue("password");
    expect(screen.getByTestId("password-confirm-input")).toHaveValue(
      "password2",
    );
  });

  it("should submit passwords and fail regex check", () => {
    render(<ResetPasswordClient />);

    const passwordInput = screen.getByTestId("password-input");
    const passwordConfirmInput = screen.getByTestId("password-confirm-input");

    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(passwordConfirmInput, { target: { value: "password" } });

    fireEvent.click(screen.getByText("Valider mon nouveau mot de passe"));
    expect(toast.error).toHaveBeenCalledWith(
      "Le mot de passe doit contenir au moins 8 caractères, dont une lettre majuscule, une lettre minuscule et un chiffre.",
    );
  });

  it("should submit passwords and fail equality check", () => {
    render(<ResetPasswordClient />);

    const passwordInput = screen.getByTestId("password-input");
    const passwordConfirmInput = screen.getByTestId("password-confirm-input");

    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(passwordConfirmInput, { target: { value: "password2" } });

    fireEvent.click(screen.getByText("Valider mon nouveau mot de passe"));
    expect(toast.error).toHaveBeenCalledWith(
      "Les mots de passe ne correspondent pas.",
    );
  });

  it("should submit passwords and fail token check", () => {
    render(<ResetPasswordClient />);

    const passwordInput = screen.getByTestId("password-input");
    const passwordConfirmInput = screen.getByTestId("password-confirm-input");

    fireEvent.change(passwordInput, { target: { value: "14jkaKWFi168!$" } });
    fireEvent.change(passwordConfirmInput, {
      target: { value: "14jkaKWFi168!$" },
    });
    fireEvent.click(screen.getByText("Valider mon nouveau mot de passe"));
    expect(mockRouterPush).not.toHaveBeenCalled();
  });

  it("should submit passwords", () => {
    render(<ResetPasswordClient />);

    const passwordInput = screen.getByTestId("password-input");
    const passwordConfirmInput = screen.getByTestId("password-confirm-input");

    fireEvent.change(passwordInput, { target: { value: "14jkaKWFi168!$" } });
    fireEvent.change(passwordConfirmInput, {
      target: { value: "14jkaKWFi168!$" },
    });
    fireEvent.click(screen.getByText("Valider mon nouveau mot de passe"));

    mockAxios.mockResponse({
      data: {},
    });

    expect(toast.success).toHaveBeenCalledWith(
      "Votre mot de passe a été modifié avec succès. Vous pouvez désormais vous connectez avec votre nouveau mot de passe.",
    );
    expect(mockRouterPush).toHaveBeenCalledWith("/connexion");
  });

  it("should submit passwords and fail", () => {
    render(<ResetPasswordClient />);

    const passwordInput = screen.getByTestId("password-input");
    const passwordConfirmInput = screen.getByTestId("password-confirm-input");

    fireEvent.change(passwordInput, { target: { value: "14jkaKWFi168!$" } });
    fireEvent.change(passwordConfirmInput, {
      target: { value: "14jkaKWFi168!$" },
    });
    fireEvent.click(screen.getByText("Valider mon nouveau mot de passe"));

    mockAxios.mockError(new Error("error submitting passwords"));

    expect(toast.error).toHaveBeenCalledWith("error submitting passwords");
  });

  it("should navigate home on delete", () => {
    render(<ResetPasswordClient />);
    fireEvent.click(screen.getByText("Annuler et retourner à l'accueil"));
    expect(mockRouterPush).toHaveBeenCalledWith("/");
  });
});
