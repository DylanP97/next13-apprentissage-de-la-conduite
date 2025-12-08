import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ConnexionModal from "./ConnexionModal";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: jest.fn(),
  }),
}));

jest.mock("react-hot-toast", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock des icônes Lucide (sinon erreur d'import)
jest.mock("lucide-react", () => ({
  Eye: () => <svg data-testid="eye-icon" />,
  EyeOff: () => <svg data-testid="eye-off-icon" />,
  Loader2: () => <svg data-testid="loader" />,
  X: () => <svg data-testid="close-icon" />,
}));

describe("ConnexionModal", () => {
  const onCloseMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should not render when isOpen is false", () => {
    render(<ConnexionModal isOpen={false} onClose={onCloseMock} />);
    expect(screen.queryByText("Connexion")).not.toBeInTheDocument();
  });

  it("should render login form by default", () => {
    render(<ConnexionModal isOpen={true} onClose={onCloseMock} />);

    expect(screen.getByText("Connexion")).toBeInTheDocument();
    expect(screen.getByText("Ravi de vous revoir !")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Mot de passe")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /se connecter/i })).toBeInTheDocument();
  });

  it("should switch to signup form when clicking 'S'inscrire'", async () => {
    render(<ConnexionModal isOpen={true} onClose={onCloseMock} />);

    await userEvent.click(screen.getByText("S'inscrire"));

    expect(screen.getByText("Inscription")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Prénom")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Nom")).toBeInTheDocument();
  });

  it("should toggle password visibility", async () => {
    render(<ConnexionModal isOpen={true} onClose={onCloseMock} />);

    const passwordInput = screen.getByPlaceholderText("Mot de passe");
    const toggleButton = screen.getByRole("button", { name: "" }); // le bouton n'a pas de texte

    expect(passwordInput).toHaveAttribute("type", "password");

    await userEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "text");

    await userEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("should call onClose when clicking the close button", async () => {
    render(<ConnexionModal isOpen={true} onClose={onCloseMock} />);

    const closeButton = screen.getByTestId("close-icon");
    await userEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("should call onClose when clicking backdrop", async () => {
    render(<ConnexionModal isOpen={true} onClose={onCloseMock} />);

    const backdrop = screen.getByRole("presentation"); // div backdrop
    await userEvent.click(backdrop);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("should call signIn('google') when clicking Google button", async () => {
    render(<ConnexionModal isOpen={true} onClose={onCloseMock} />);

    await userEvent.click(screen.getByText("Continuer avec Google"));

    expect(signIn).toHaveBeenCalledWith("google");
  });

  it("should show loading state during login", async () => {
    (signIn as jest.Mock).mockResolvedValueOnce({ ok: true });

    render(<ConnexionModal isOpen={true} onClose={onCloseMock} />);

    await userEvent.type(screen.getByPlaceholderText("Email"), "test@example.com");
    await userEvent.type(screen.getByPlaceholderText("Mot de passe"), "password123");

    await userEvent.click(screen.getByRole("button", { name: /se connecter/i }));

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("should show success toast and close on successful login", async () => {
    (signIn as jest.Mock).mockResolvedValueOnce({ ok: true });

    render(<ConnexionModal isOpen={true} onClose={onCloseMock} />);

    await userEvent.type(screen.getByPlaceholderText("Email"), "test@example.com");
    await userEvent.type(screen.getByPlaceholderText("Mot de passe"), "password123");
    await userEvent.click(screen.getByRole("button", { name: /se connecter/i }));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Connecté !");
    });

    await waitFor(() => {
      expect(onCloseMock).toHaveBeenCalledTimes(1);
    });
  });

  it("should show error toast on failed login", async () => {
    (signIn as jest.Mock).mockResolvedValueOnce({ ok: false, error: "Invalid credentials" });

    render(<ConnexionModal isOpen={true} onClose={onCloseMock} />);

    await userEvent.type(screen.getByPlaceholderText("Email"), "wrong@example.com");
    await userEvent.type(screen.getByPlaceholderText("Mot de passe"), "wrong");
    await userEvent.click(screen.getByRole("button", { name: /se connecter/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Invalid credentials");
    });
  });

  it("should handle signup successfully", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      } as Response)
    );

    render(<ConnexionModal isOpen={true} onClose={onCloseMock} />);

    await userEvent.click(screen.getByText("S'inscrire"));

    await userEvent.type(screen.getByPlaceholderText("Prénom"), "Jean");
    await userEvent.type(screen.getByPlaceholderText("Nom"), "Dupont");
    await userEvent.type(screen.getByPlaceholderText("Email"), "jean@example.com");
    await userEvent.type(screen.getByPlaceholderText("Mot de passe"), "secret123");

    await userEvent.click(screen.getByRole("button", { name: /s'inscrire/i }));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Inscription réussie ! Connectez-vous");
    });
  });
});