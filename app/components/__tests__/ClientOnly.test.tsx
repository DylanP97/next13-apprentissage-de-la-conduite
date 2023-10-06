import { render, screen } from "@testing-library/react";
import ClientOnly from "../ClientOnly";

describe("@ClientOnly", () => {
  it("should render @ClientOnly component correctly", () => {
    const childTestId = "test-childId";
    render(
      <ClientOnly>
        <div data-testid={childTestId}>Test</div>{" "}
      </ClientOnly>,
    );
    expect(screen.getByTestId(childTestId)).toBeInTheDocument();
  });
});
