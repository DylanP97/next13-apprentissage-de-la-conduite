import { fireEvent, render, screen } from "@testing-library/react";
import PlanCard from "../PlanCard";
import mockAxios from "jest-mock-axios";

const mockRouterPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: mockRouterPush,
    };
  },
}));

describe("@PlanCard", () => {
  afterEach(() => {
    mockAxios.mockRestore();
  });
  it("should render @PlanCard component correctly", () => {
    render(
      <PlanCard label="" priceLabel="" planId={0} features={[]} userId="" />
    );

    expect(screen.getByText("S'abonner")).toBeInTheDocument();
    expect(screen.getByText("/mois")).toBeInTheDocument();
  });

  describe("@label", () => {
    it("should render component with @label", () => {
      render(
        <PlanCard
          label="test label"
          priceLabel=""
          planId={0}
          features={[]}
          userId=""
        />
      );
      expect(screen.getByText("test label")).toBeInTheDocument();
    });
  });

  describe("@priceLabel", () => {
    it("should render component with @priceLabel", () => {
      render(
        <PlanCard
          label=""
          priceLabel="test priceLabel"
          planId={0}
          features={[]}
          userId=""
        />
      );
      expect(screen.getByText("test priceLabel/mois")).toBeInTheDocument();
    });
  });

  describe("@planId", () => {
    it("should render component with @planId and fail handleClick", () => {
      render(
        <PlanCard label="" priceLabel="" planId={0} features={[]} userId="" />
      );

      fireEvent.click(screen.getByRole("button"));
      mockAxios.mockError(new Error("Post request failed"));
      expect(mockRouterPush).not.toBeCalled();
    });

    it("should render component with @planId and handleClick", () => {
      render(
        <PlanCard label="" priceLabel="" planId={12} features={[]} userId="" />
      );

      fireEvent.click(screen.getByRole("button"));
      mockAxios.mockResponse({ data: { message: "testMessage" } });
      expect(mockAxios.post).toHaveBeenCalledWith(
        "/api/stripe",
        '{"items":[{"id":12,"quantity":1}],"userId":""}'
      );
      expect(mockRouterPush).toBeCalled();
    });
  });

  describe("@features", () => {
    it("should render component with @features", () => {
      render(
        <PlanCard label="" priceLabel="" planId={0} features={[]} userId="" />
      );
      expect(screen.getByRole("list")).toBeEmptyDOMElement();
    });

    it("should render component with @features", () => {
      render(
        <PlanCard label="" priceLabel="" planId={0} features={[]} userId="" />
      );
      expect(screen.getByRole("list")).toBeEmptyDOMElement();
    });

    it("should render component with @features as expected type", () => {
      render(
        <PlanCard
          label=""
          priceLabel=""
          planId={0}
          features={["a", "b"]}
          userId=""
        />
      );
      expect(screen.getByRole("list")).not.toBeEmptyDOMElement();
      expect(screen.getAllByRole("listitem")).toHaveLength(2);
    });
  });

  describe("@userId", () => {
    it("should render component with @userId and handleClick", () => {
      render(
        <PlanCard
          label=""
          priceLabel=""
          planId={10}
          features={[]}
          userId="test userId"
        />
      );

      fireEvent.click(screen.getByRole("button"));
      mockAxios.mockResponse({ data: { message: "testMessage" } });
      expect(mockAxios.post).toHaveBeenCalledWith(
        "/api/stripe",
        '{"items":[{"id":10,"quantity":1}],"userId":"test userId"}'
      );
      expect(mockRouterPush).toBeCalled();
    });
  });
});
