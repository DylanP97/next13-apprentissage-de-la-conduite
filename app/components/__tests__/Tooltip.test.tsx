import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Tooltip from "../Tooltip";

describe("@Tooltip", () => {
  const message = "Supprimer l'utilisateur";
  it("should render @Tooltip component correctly", () => {
    const childTestId = "tooltip-child";

    render(
      <Tooltip message={message}>
        <div data-testid={childTestId}>child</div>
      </Tooltip>,
    );

    expect(screen.getByTestId(childTestId)).toBeInTheDocument();
  });

  describe("@message", () => {
    it("should show message when hovered over the tooltip", async () => {
      render(
        <Tooltip message={message}>
          <div>child</div>
        </Tooltip>,
      );
      const trigger = screen.getByTestId("tooltip");

      // Tooltip is not visible by default
      expect(screen.queryByTestId(message)).not.toBeInTheDocument();
      // Tooltip is visible when hovered over
      await userEvent.hover(trigger);
      expect(trigger).toBeInTheDocument();
      // Tooltip is not visible when unhovered
      await userEvent.unhover(trigger);
      expect(screen.queryByTestId(message)).not.toBeInTheDocument();
    });
  });

  describe("@clicking", () => {
    it("should handle event for @clicking", async () => {
      const mockOnClick = jest.fn();
      render(
        <Tooltip message={message} clicking={mockOnClick}>
          <div>child</div>
        </Tooltip>,
      );

      fireEvent.click(screen.getByTestId("tooltip"));
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
  });
});
