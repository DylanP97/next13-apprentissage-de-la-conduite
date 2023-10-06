import { fireEvent, render, screen } from "@testing-library/react";
import { ArticleEditionSimpleInput } from "../ArticleEditionSimpleInput";

describe("@ArticleEditionSimpleInput", () => {
  it("should render @ArticleEditionSimpleInput component correctly", () => {
    render(<ArticleEditionSimpleInput />);

    expect(screen.getByText("Titre de l'article")).toBeInTheDocument();
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("placeholder", "Ajouter un undefined");
    expect(input).toBeRequired();
  });

  describe("@instruction", () => {
    it("should render component with @instruction as undefined", () => {
      render(<ArticleEditionSimpleInput instruction={undefined} />);

      expect(
        screen.getByTestId("ArticleEditionSimpleInput-instruction"),
      ).toBeEmptyDOMElement();
    });

    it("should render component with @instruction", () => {
      const testInstruction = "test instruction";
      render(<ArticleEditionSimpleInput instruction={testInstruction} />);

      expect(
        screen.getByTestId("ArticleEditionSimpleInput-instruction"),
      ).not.toBeEmptyDOMElement();
      expect(screen.getByText(testInstruction)).toBeInTheDocument();
    });
  });

  describe("@label", () => {
    it("should render component with @label", () => {
      const testLabel = "test label";
      render(<ArticleEditionSimpleInput label={testLabel} />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("placeholder", `Ajouter un ${testLabel}`);
    });
  });

  describe("@data", () => {
    it("should render component with @data", () => {
      const testData = "test data";
      render(<ArticleEditionSimpleInput data={undefined} />);

      const input = screen.getByRole("textbox");
      expect(input).not.toHaveValue();
    });

    it("should render component with @data", () => {
      const testData = "test data";
      render(<ArticleEditionSimpleInput data={testData} />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveValue(testData);
    });
  });

  describe("@state", () => {
    it("should trigger @state on input change", () => {
      const inputValue = "testInputValue";
      const mockState = jest.fn();
      render(<ArticleEditionSimpleInput state={mockState} />);

      const input = screen.getByRole("textbox");
      fireEvent.change(input, { target: { value: inputValue } });
      expect(mockState).toHaveBeenCalledWith(inputValue);
    });
  });
});
