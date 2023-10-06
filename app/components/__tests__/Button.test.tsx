import { fireEvent, render, screen } from "@testing-library/react";
import Button from "../Button";
import carImage from "@/public/images/car.png";

describe("@Button", () => {
  it("should render @Button component correctly", () => {
    render(<Button label="" onClick={undefined} />);
    expect(screen.getByTestId("button")).toBeInTheDocument();
    expect(screen.queryByTestId("button-icon")).not.toBeInTheDocument();
  });

  describe("@label", () => {
    it("should render button with @label", () => {
      const message = "Supprimer l'utilisateur";

      render(<Button label={message} onClick={undefined} />);
      expect(screen.getByText(message)).toBeInTheDocument();
    });
  });

  describe("@onClick", () => {
    it("should trigger @onClick event when button is clicked", () => {
      const mockOnClick = jest.fn();
      render(<Button label="" onClick={mockOnClick} />);

      fireEvent.click(screen.getByTestId("button"));
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("@disabled", () => {
    it("should render button in disabled state", () => {
      render(<Button label="" onClick={undefined} disabled={true} />);
      expect(screen.getByTestId("button")).toBeDisabled();
    });

    it("should render button in enable state", () => {
      render(<Button label="" onClick={undefined} disabled={false} />);
      expect(screen.getByTestId("button")).toBeEnabled();
    });
  });

  describe("@icon", () => {
    it("should render button in disabled state", () => {
      render(<Button label="" onClick={undefined} icon={carImage} />);
      expect(screen.getByTestId("button-icon")).toBeInTheDocument();
    });
  });
});
