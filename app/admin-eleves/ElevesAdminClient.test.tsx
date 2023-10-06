import { fireEvent, render, screen, act } from "@testing-library/react";
import ElevesAdminClient from "./ElevesAdminClient";
import mockAxios from "jest-mock-axios";
import toast from "react-hot-toast";

jest.mock("react-hot-toast");

const testUser = [
  {
    id: "1",
    email: "test@email.com",
    firstName: "test firstName",
    lastName: "test lastName",
    isAccepted: true,
  },
];

describe("@ElevesAdminClient", () => {
  afterEach(() => {
    mockAxios.mockRestore();
  });

  it("should render component correctly", () => {
    render(<ElevesAdminClient users={undefined} />);

    expect(
      screen.getByText(
        "Ici gérer les inscriptions, les rôles ou supprimer des comptes d'utilisateurs.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("Tous les Utilisateurs")).toBeInTheDocument();
  });

  describe("@user", () => {
    it("should render component with user as null", () => {
      render(<ElevesAdminClient users={null} />);

      expect(
        screen.getByText(
          "Ici gérer les inscriptions, les rôles ou supprimer des comptes d'utilisateurs.",
        ),
      ).toBeInTheDocument();
      expect(screen.getByText("Tous les Utilisateurs")).toBeInTheDocument();
    });

    it("should render component with valid user and update=success for isAccepted=false", () => {
      window.innerWidth = 500;
      render(
        <ElevesAdminClient
          users={[
            {
              id: 1,
              email: "test@email.com",
              firstName: "test firstName",
              lastName: "test lastName",
              isAccepted: false,
            },
          ]}
        />,
      );

      fireEvent.click(screen.getByText("Valider l'utilistateur"));
      mockAxios.mockResponse({
        data: {},
      });
      expect(toast.success).toHaveBeenCalledWith(
        "L'utilisateur a bien été accepté.",
      );
    });

    it("should render component with valid user and update=success for isAccepted=true", () => {
      window.innerWidth = 800;
      render(
        <ElevesAdminClient
          users={[
            {
              id: 1,
              email: "test@email.com",
              firstName: "test firstName",
              lastName: "test lastName",
              isAccepted: true,
              isAdmin: false,
            },
          ]}
        />,
      );

      fireEvent.click(screen.getByAltText("accepted"));
      mockAxios.mockResponse({
        data: {},
      });
      expect(toast.success).toHaveBeenCalledWith(
        "L'utilisateur n'a désormais plus accès aux blogs.",
      );
    });

    it("should render component with valid user and update=failed", () => {
      window.innerWidth = 500;
      render(
        <ElevesAdminClient
          users={[
            {
              id: 1,
              email: "test@email.com",
              firstName: "test firstName",
              lastName: "test lastName",
              isAccepted: false,
            },
          ]}
        />,
      );

      fireEvent.click(screen.getByText("Valider l'utilistateur"));
      mockAxios.mockError(new Error("error"));
      expect(toast.error).toHaveBeenCalledWith(
        "Une erreur s'est produite dans la requête.",
      );
    });

    it("should render component with valid user and delete=success", () => {
      window.innerWidth = 500;
      render(<ElevesAdminClient users={testUser} />);

      fireEvent.click(screen.getByText("Supprimer l'utilisateur"));
      act(() => {
        mockAxios.mockResponse({
          data: {},
        });
      });
      expect(toast.success).toHaveBeenCalledWith(
        "L'utilisateur vient d'être supprimé.",
      );
    });

    it("should render component with valid user and delete=failed", () => {
      window.innerWidth = 500;
      render(<ElevesAdminClient users={testUser} />);

      fireEvent.click(screen.getByText("Supprimer l'utilisateur"));
      mockAxios.mockError(new Error("error"));
      expect(toast.error).toHaveBeenCalledWith("Il y a eu une erreur.");
    });

    it("should render component with valid user and toggleAdmin=success", () => {
      window.innerWidth = 500;
      render(<ElevesAdminClient users={testUser} />);

      fireEvent.click(screen.getByText("Promouvoir administrateur"));
      act(() => {
        mockAxios.mockResponse({
          data: {},
        });
      });
      expect(toast.success).toHaveBeenCalledWith(
        "L'utilisateur est devenu administrateur.",
      );
    });

    it("should render component with valid user and toggleAdmin=success", () => {
      window.innerWidth = 500;
      render(
        <ElevesAdminClient
          users={[
            {
              id: 1,
              email: "test@email.com",
              firstName: "test firstName",
              lastName: "test lastName",
              isAccepted: false,
              isAdmin: true,
            },
          ]}
        />,
      );

      fireEvent.click(screen.getByText("Enlever rôle d'administrateur"));
      act(() => {
        mockAxios.mockResponse({
          data: {},
        });
      });
      expect(toast.success).toHaveBeenCalledWith(
        "L'utilisateur n'est plus administrateur.",
      );
    });

    it("should render component with valid user and toggleAdmin=failed", () => {
      window.innerWidth = 500;
      render(<ElevesAdminClient users={testUser} />);

      fireEvent.click(screen.getByText("Promouvoir administrateur"));
      mockAxios.mockError(new Error("error"));
      expect(toast.error).toHaveBeenCalledWith(
        "une erreur s'est produite dans la requête",
      );
    });
  });
});
