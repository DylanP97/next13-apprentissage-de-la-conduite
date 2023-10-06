import { render, screen } from "@testing-library/react";
import HomeGreetings from "../HomeGreeting";
import { User } from "@prisma/client";

describe("@HomeGreetings", () => {
  it("should render @HomeGreetings component correctly with user.name", () => {
    const user: Partial<User> = {
      name: "testName",
    };

    render(<HomeGreetings currentUser={user as User} />);
    expect(screen.getByText(`Bonjour ${user.name}`)).toBeInTheDocument();
  });

  it("should render @HomeGreetings component with user.firstName", () => {
    const user: Partial<User> = {
      name: "testName",
      firstName: "testFirstName",
    };

    render(<HomeGreetings currentUser={user as User} />);
    expect(screen.getByText(`Bonjour ${user.firstName}`)).toBeInTheDocument();
  });
});
