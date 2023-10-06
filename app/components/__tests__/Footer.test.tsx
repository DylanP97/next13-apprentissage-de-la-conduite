import { render, screen } from "@testing-library/react";
import Footer from "../Footer";

describe("@Footer", () => {
  it("should render @Footer component correctly", () => {
    render(<Footer />);
    expect(
      screen.getByText(
        "Si vous avez des suggestions d'articles n'hésitez pas à me contacter.",
      ),
    ).toBeInTheDocument();
  });
});
