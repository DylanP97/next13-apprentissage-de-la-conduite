import { fireEvent, render, screen } from "@testing-library/react";
import ProfileClient from "./ProfileClient";
import mockAxios from "jest-mock-axios";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";

const mockRouterPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: mockRouterPush,
    };
  },
}));

jest.mock("react-hot-toast");
jest.mock("next-auth/react");

describe("@ProfileClient", () => {
  it("should render @ProfileClient component correctly", () => {
    render(<ProfileClient currentUser={undefined} />);
    expect(screen.getByText("Votre adresse email :")).toBeInTheDocument();
    expect(screen.getByText("Votre abonnement")).toBeInTheDocument();
    expect(screen.getByText("Suspendre mon abonnement")).toBeInTheDocument();
    expect(screen.getByText("Supprimer mon compte")).toBeInTheDocument();
  });

  it("should render @ProfileClient component with @currentUser=null", () => {
    render(<ProfileClient currentUser={null} />);
    expect(screen.getByText("Votre adresse email :")).toBeInTheDocument();
    expect(screen.getByText("Votre abonnement")).toBeInTheDocument();
    expect(screen.getByText("Suspendre mon abonnement")).toBeInTheDocument();
    expect(screen.getByText("Supprimer mon compte")).toBeInTheDocument();
  });

  it("should render @ProfileClient component with @currentUser and firstname", () => {
    const testUser = {
      firstName: "test firstName",
      email: "test@email.com",
    };
    render(<ProfileClient currentUser={testUser} />);
    expect(
      screen.getByText(`Votre adresse email : ${testUser.email}`),
    ).toBeInTheDocument();
    expect(screen.getByText(testUser.firstName)).toBeInTheDocument();
  });

  it("should render @ProfileClient component with @currentUser and name", () => {
    const testUser = {
      name: "test name",
    };
    render(<ProfileClient currentUser={testUser} />);
    expect(screen.getByText(testUser.name)).toBeInTheDocument();
  });

  it("should render @ProfileClient component with @currentUser and subscribed", () => {
    const testUser = {
      name: "test name",
      isSubscribed: true,
    };
    render(<ProfileClient currentUser={testUser} />);
    expect(
      screen.getByText("Forfait actuel : N'a pas souscrit à un abonnement"),
    ).toBeInTheDocument();
  });

  it("should trigger delete=success", () => {
    const testUser = {
      id: 1,
      isAdmin: true,
    };
    render(<ProfileClient currentUser={testUser} />);

    fireEvent.click(screen.getByText("Supprimer mon compte"));
    mockAxios.mockResponse({
      data: {},
    });
    expect(toast.success).toHaveBeenCalledWith(
      "Votre compte vient d'être supprimé.",
    );
    expect(mockRouterPush).toHaveBeenCalledWith("/");
  });

  it("should trigger delete=failed", () => {
    const testUser = {
      id: 1,
      isAdmin: true,
    };
    render(<ProfileClient currentUser={testUser} />);

    fireEvent.click(screen.getByText("Supprimer mon compte"));
    mockAxios.mockError(new Error("Delete request failed"));
    expect(toast.error).toHaveBeenCalledWith("Il y a eu une erreur.");
  });

  it("should trigger cancelSubscription=success", () => {
    const testUser = {
      id: 1,
      isAdmin: false,
    };
    render(<ProfileClient currentUser={testUser} />);

    fireEvent.click(screen.getByText("Suspendre mon abonnement"));
    mockAxios.mockResponse({
      data: {},
    });
    expect(toast.success).toHaveBeenCalledWith(
      "Annulation de votre abonnement bien prise en compte !",
    );
    expect(mockRouterPush).toHaveBeenCalledWith("/");
    expect(signOut).toHaveBeenCalled();
  });

  it("should trigger cancelSubscription=failed", () => {
    const testUser = {
      id: 1,
      isAdmin: false,
    };
    render(<ProfileClient currentUser={testUser} />);

    fireEvent.click(screen.getByText("Suspendre mon abonnement"));
    mockAxios.mockError(new Error("Delete request failed"));
    expect(toast.error).toHaveBeenCalledWith(
      "Il y a eu une erreur lors de la modification du profil.",
    );
    expect(signOut).toHaveBeenCalled();
  });
});
