import { fireEvent, render, screen } from "@testing-library/react";
import ContactClient from "./ContactClient";
import mockAxios from "jest-mock-axios";

describe("@ContactClient", () => {
  afterEach(() => {
    mockAxios.mockRestore();
  });

  it("should render @ContactClient component correctly", () => {
    render(<ContactClient currentUser={undefined} />);
    expect(screen.getByText("Contact")).toBeInTheDocument();
    expect(screen.getByText("Message")).toBeInTheDocument();
    expect(
      screen.getByText("Envoyé ma demande de contact"),
    ).toBeInTheDocument();
    expect(screen.getByText("Revenir à la page d'accueil")).toBeInTheDocument();
  });

  it("should render component with @currentUser=null", () => {
    render(<ContactClient currentUser={null} />);
    expect(screen.getByText("Contact")).toBeInTheDocument();
    expect(screen.getByText("Message")).toBeInTheDocument();
    expect(
      screen.getByText("Envoyé ma demande de contact"),
    ).toBeInTheDocument();
    expect(screen.getByText("Revenir à la page d'accueil")).toBeInTheDocument();
  });

  it("should trigger with no message", () => {
    render(<ContactClient currentUser={undefined} />);

    fireEvent.click(screen.getByText("Envoyé ma demande de contact"));
    expect(screen.getByText("Il n'y a pas de contenu dans votre message"));
  });

  it.skip("should update message and trigger success send", () => {
    render(
      <ContactClient
        currentUser={{
          firstName: "test firstname",
          email: "test email",
        }}
      />,
    );

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("id", "message");

    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.keyDown(input, { key: "Enter", keyCode: 13 });

    fireEvent.click(screen.getByText("Envoyé ma demande de contact"));

    mockAxios.mockResponse({
      data: {},
    });
    expect(
      screen.getByText(
        "Votre messavsge a bien été envoyé! Vous pouvez retourner à la page d'accueil",
      ),
    );
  });
});
