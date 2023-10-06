import { render, screen } from "@testing-library/react";
import ToasterProvider from "./ToasterProvider";

describe("@ToasterProvider", () => {
  it("should render @ToasterProvider component correctly", () => {
    const { container } = render(<ToasterProvider />);
    expect(container.childNodes).toHaveLength(1);
  });
});
