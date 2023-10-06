import { render, screen } from "@testing-library/react";
import ThanksForYourApplication from "../ThanksForYourApplication";

describe("@ThanksForYourApplication", () => {
  it("should render @ThanksForYourApplication component correctly", () => {
    render(<ThanksForYourApplication />);
    expect(
      screen.getByText(
        "Nous allons examiner votre demande et vous tiendrons informé par email de son acceptation éventuelle.",
      ),
    ).toBeInTheDocument();
  });
});
