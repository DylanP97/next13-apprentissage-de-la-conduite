import { render, screen, act, fireEvent } from "@testing-library/react";
import QuizAdminClient from "./QuizAdminClient";
import mockAxios from "jest-mock-axios";
import toast from "react-hot-toast";

jest.mock("react-hot-toast");

const mockQuestions = [
  {
    id: 1,
  },
];

describe("@QuizAdminClient", () => {
  afterEach(() => {
    mockAxios.mockRestore();
  });

  it("should render component correctly", () => {
    render(<QuizAdminClient questions={undefined} />);

    expect(screen.getByText("Gérer les Questions du Quiz")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Créer une question, modifier et consulter les questions existantes.",
      ),
    ).toBeInTheDocument();
  });

  describe("@questions", () => {
    it("should render component with @questions=null", () => {
      render(<QuizAdminClient questions={null} />);

      expect(
        screen.getByText("Gérer les Questions du Quiz"),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          "Créer une question, modifier et consulter les questions existantes.",
        ),
      ).toBeInTheDocument();
    });

    it("should trigger delete=success", () => {
      render(<QuizAdminClient questions={mockQuestions} />);

      fireEvent.click(screen.getByAltText("trash"));
      act(() => {
        mockAxios.mockResponse({ data: {} });
      });
      expect(toast.success).toHaveBeenCalledWith(
        "Cette question a été supprimer.",
      );
    });

    it("should trigger delete=failed", () => {
      render(<QuizAdminClient questions={mockQuestions} />);

      fireEvent.click(screen.getByAltText("trash"));
      mockAxios.mockError(new Error("error"));
      expect(toast.error).toHaveBeenCalledWith(
        "Une erreur s'est produite dans la requête.",
      );
    });

    it("should trigger publis=success with published=true", () => {
      render(
        <QuizAdminClient
          questions={[
            {
              id: 1,
              published: true,
            },
          ]}
        />,
      );

      fireEvent.click(screen.getAllByAltText("view")[0]);
      act(() => {
        mockAxios.mockResponse({
          data: {
            data: {
              id: 1,
            },
          },
        });
      });
      expect(toast.success).toHaveBeenCalledWith(
        "La question n'est désormais plus dans le quiz",
      );
    });

    it("should trigger publis=success with published=false", () => {
      render(
        <QuizAdminClient
          questions={[
            {
              id: 1,
              published: false,
            },
          ]}
        />,
      );

      fireEvent.click(screen.getAllByAltText("view")[0]);
      act(() => {
        mockAxios.mockResponse({
          data: {
            data: {
              id: 1,
            },
          },
        });
      });
      expect(toast.success).toHaveBeenCalledWith(
        "La question est désormais dans le quiz.",
      );
    });

    it("should trigger publis=failed", () => {
      render(<QuizAdminClient questions={mockQuestions} />);

      fireEvent.click(screen.getAllByAltText("view")[0]);
      mockAxios.mockError(new Error("error"));
      expect(toast.error).toHaveBeenCalledWith(
        "Une erreur s'est produite dans la requête.",
      );
    });
  });
});
