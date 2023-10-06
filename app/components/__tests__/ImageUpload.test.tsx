import { fireEvent, render, screen } from "@testing-library/react";
import ImageUpload from "../ImageUpload";
import carImage from "@/public/images/car.png";

const mockCldUploadOpenFunction = jest.fn();
const uploadButtonId = "CldUploadWidget-upload";

jest.mock("next-cloudinary", () => ({
  CldUploadWidget: ({
    children,
    onUpload,
  }: {
    children: (props: { open: () => void }) => JSX.Element;
    onUpload: (result: any) => void;
  }) => {
    const openMock = mockCldUploadOpenFunction();

    const simulateFileUpload = () => {
      const result = { info: { secure_url: "https://example.com/image.jpg" } };
      onUpload(result);
    };

    return (
      <div>
        {children({ open: openMock })}
        <button data-testid={uploadButtonId} onClick={simulateFileUpload}>
          Simulate Upload
        </button>
      </div>
    );
  },
}));

describe("@ImageUpload", () => {
  it("should render @ImageUpload component correctly", () => {
    render(<ImageUpload onChange={jest.fn()} />);
    expect(
      screen.getByText("Cliquer pour télécharger une image"),
    ).toBeInTheDocument();
  });

  describe("@value", () => {
    it("should render component with @value", () => {
      render(<ImageUpload onChange={jest.fn()} value={carImage.src} />);

      expect(screen.getByAltText("value-image")).toBeInTheDocument();

      fireEvent.click(screen.getByTestId("image-upload"));
      expect(mockCldUploadOpenFunction).toHaveBeenCalled();
    });
  });

  describe("@id", () => {
    it("should render component with @id", () => {
      const testId = "test-id";
      render(
        <ImageUpload onChange={jest.fn()} value={carImage.src} id={testId} />,
      );

      const uploadImageElement = screen.getByTestId("image-upload");
      expect(uploadImageElement).toHaveAttribute("id", testId);
    });
  });

  describe("@onChange", () => {
    it("should trigger @onChange if CldUploadWidget fires upload", () => {
      const mockOnChange = jest.fn();
      render(<ImageUpload onChange={mockOnChange} value={carImage.src} />);

      fireEvent.click(screen.getByTestId(uploadButtonId));
      expect(mockOnChange).toHaveBeenCalledTimes(1);
    });
  });
});
