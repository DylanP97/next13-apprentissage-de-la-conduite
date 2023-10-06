import { fireEvent, render, screen } from "@testing-library/react";
import Input from "../Input";
import { FieldErrors } from "react-hook-form";

jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  UseFormRegister: jest.fn(),
}));

describe("@Input", () => {
  const mockErrors: FieldErrors = {};
  it("should render @Input component correctly", () => {
    render(<Input id="test" register={jest.fn()} errors={mockErrors} />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("id", "test");
    expect(input).toBeEnabled();
    expect(input).toHaveAttribute("placeholder", "current");
    expect(input).not.toHaveValue();
  });
  it("should update value of @Input component", () => {
    const inputValue = "testInputValue";
    render(<Input id="test" register={jest.fn()} errors={mockErrors} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: inputValue } });
    expect(input).toHaveValue(inputValue);
  });

  describe("@defaultValue,", () => {
    it("should Input with @defaultValue", () => {
      const defaultInputValue = "defaultTestValue";
      render(
        <Input
          id="test"
          register={jest.fn()}
          errors={mockErrors}
          defaultValue={defaultInputValue}
        />,
      );

      const input = screen.getByRole("textbox");
      expect(input).toHaveValue(defaultInputValue);
    });
  });

  describe("@disabled,", () => {
    it("should render Input with @disabled=true", () => {
      render(
        <Input
          id="test"
          register={jest.fn()}
          errors={mockErrors}
          disabled={true}
        />,
      );
      expect(screen.getByRole("textbox")).toBeDisabled();
    });

    it("should render Input with @disabled=false", () => {
      render(
        <Input
          id="test"
          register={jest.fn()}
          errors={mockErrors}
          disabled={false}
        />,
      );
      expect(screen.getByRole("textbox")).toBeEnabled();
    });
  });

  describe("@required,", () => {
    it("should render Input with @required=true", () => {
      const mockRequired = jest.fn();
      render(
        <Input
          id="test"
          register={mockRequired}
          errors={mockErrors}
          required={true}
        />,
      );
      expect(mockRequired).toBeCalledWith("test", { required: true });
    });

    it("should render Input with @required=false", () => {
      const mockRequired = jest.fn();
      render(
        <Input
          id="test"
          register={jest.fn()}
          errors={mockErrors}
          disabled={false}
        />,
      );
      expect(mockRequired).not.toBeCalledWith("test", { false: true });
    });
  });
});
