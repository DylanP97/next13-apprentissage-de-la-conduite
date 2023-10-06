import { render, screen } from "@testing-library/react";
import Intro from "../Intro";

const title =
  "Bienvenue sur Apprentissage de la Conduite et de la Sécurité Routière";

describe("@Intro", () => {
  it("should render @Intro component correctly", () => {
    render(<Intro />);
    expect(screen.getByText(title)).toBeInTheDocument();

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("href", "/connexion");
  });
});
