import { fireEvent, render, screen } from "@testing-library/react";
import CardEditionStep from "../CardEditionStep";
import carImage from "@/public/images/car.png";

const testData = {
  answers: ["Réponse 1", "Réponse 2"],
  correctAnswer: 1,
  question: "Question",
  imageUrl: carImage.src,
};
describe("@CardEditionStep", () => {
  it("should render @CardEditionStep component correctly", () => {
    render(<CardEditionStep />);
    expect(screen.getByText("Définissez une question")).toBeInTheDocument();
    expect(
      screen.getByText("La question ne peut pas être vide"),
    ).toBeInTheDocument();
  });

  describe("@data", () => {
    it("should render component with @data=undefined", () => {
      render(<CardEditionStep data={undefined} />);
      expect(screen.getByText("Définissez une question")).toBeInTheDocument();
      expect(
        screen.getByText("La question ne peut pas être vide"),
      ).toBeInTheDocument();
    });

    it("should render component with @data=null", () => {
      render(<CardEditionStep data={null} />);
      expect(screen.getByText("Définissez une question")).toBeInTheDocument();
      expect(
        screen.getByText("La question ne peut pas être vide"),
      ).toBeInTheDocument();
    });
  });

  describe("@cancelEdition", () => {
    it("should render component with @data", () => {
      const mockCancelEdition = jest.fn();
      render(
        <CardEditionStep data={testData} cancelEdition={mockCancelEdition} />,
      );

      fireEvent.click(screen.getByText("Annuler"));
      expect(mockCancelEdition).toHaveBeenCalledTimes(1);
    });

    it("should render component with @data", () => {
      const mockCancelEdition = jest.fn();
      render(
        <CardEditionStep
          data={[
            {
              answers: ["Réponse 1"],
              correctAnswer: 0,
            },
          ]}
          cancelEdition={mockCancelEdition}
        />,
      );

      fireEvent.click(screen.getByText("Annuler"));
      expect(mockCancelEdition).toHaveBeenCalledTimes(1);
    });
  });

  describe("@cancelEdition", () => {
    it("should render component with @data", () => {
      const mockCancelEdition = jest.fn();
      render(
        <CardEditionStep data={testData} cancelEdition={mockCancelEdition} />,
      );

      fireEvent.click(screen.getByText("Suivant"));
      expect(screen.getAllByRole("button")).toHaveLength(5);
      fireEvent.click(screen.getAllByAltText("delete")[1]);

      const buttons = screen.getAllByRole("button");
      expect(screen.getAllByRole("button")).toHaveLength(4);
      fireEvent.click(buttons[1]);

      const input = screen.getByTestId("answer-input-0");
      fireEvent.change(input, { target: { value: "c" } });

      fireEvent.click(screen.getByText("Ajouter une réponse"));

      // navigation
      fireEvent.click(screen.getByText("Précédent"));
      //   fireEvent.click(screen.getByText("Suivant"));

      const questionInput = screen.getByTestId("question-input");
      fireEvent.change(questionInput, { target: { value: "c" } });

      //   expect(
      //     screen.getByText("La question ne peut pas êtsdsre vide")
      //   ).toBeInTheDocument();
    });
  });

  describe("@cancelEdition", () => {
    it("should render component with @data", () => {
      const mockCancelEdition = jest.fn();
      render(
        <CardEditionStep
          data={[
            {
              answers: ["Réponse 1"],
            },
          ]}
          cancelEdition={mockCancelEdition}
        />,
      );
    });
  });
});
