import { fireEvent, render, screen } from "@testing-library/react";
import QuizClient from "./QuizClient";

describe("@QuizClient", () => {
  it("should render @QuizClient component correctly", () => {
    render(<QuizClient publishedQuestions={undefined} />);
    expect(screen.getByText("Quiz")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Répondez à une série de questions pour vous préparez à l'examen de la conduite."
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Démarrer le Quiz")).toBeInTheDocument();
  });

  describe("@publishedQuestions", () => {
    it("should render component with @publishedQuestions=null", () => {
      render(<QuizClient publishedQuestions={null} />);
      expect(screen.getByText("Quiz")).toBeInTheDocument();
      expect(
        screen.getByText(
          "Répondez à une série de questions pour vous préparez à l'examen de la conduite."
        )
      ).toBeInTheDocument();
      expect(screen.getByText("Démarrer le Quiz")).toBeInTheDocument();
    });
  });

  it("should start quiz", () => {
    render(
      <QuizClient
        publishedQuestions={[
          {
            question: "question 1",
          },
        ]}
      />
    );

    fireEvent.click(screen.getByText("Démarrer le Quiz"));
    expect(screen.getByText("question 1")).toBeInTheDocument();
    expect(() => screen.getByText("Score : 0 sur 1")).toThrow();
    expect(() => screen.getByText("1 questions")).toThrow();
  });

  it("should start quiz for mobile", () => {
    window.innerWidth = 500;
    render(
      <QuizClient
        publishedQuestions={[
          {
            question: "question 1",
          },
        ]}
      />
    );

    fireEvent.click(screen.getByText("Démarrer le Quiz"));
    expect(screen.getByText("Score : 0 sur 1")).toBeInTheDocument();
    expect(screen.getByText("1 questions")).toBeInTheDocument();
  });

  it("should start quiz and select correct answer", () => {
    window.innerWidth = 500;
    render(
      <QuizClient
        publishedQuestions={[
          {
            question: "question 1",
            answers: ["answer 1", "answer 2"],
            correctAnswer: 0,
          },
        ]}
      />
    );

    fireEvent.click(screen.getByText("Démarrer le Quiz"));
    fireEvent.click(screen.getByTestId("answer-0"));
    expect(
      screen.getByText("Bravo, c'est la bonne réponse!")
    ).toBeInTheDocument();
    expect(screen.getByText("Score : 1 sur 1")).toBeInTheDocument();
  });

  it("should start quiz and select incorrect answer", () => {
    window.innerWidth = 500;
    render(
      <QuizClient
        publishedQuestions={[
          {
            question: "question 1",
            answers: ["answer 1", "answer 2"],
            correctAnswer: 1,
          },
        ]}
      />
    );

    fireEvent.click(screen.getByText("Démarrer le Quiz"));
    fireEvent.click(screen.getByTestId("answer-0"));
    expect(screen.getByText("C'est la mauvaise réponse!")).toBeInTheDocument();
    expect(screen.getByText("Score : 0 sur 1")).toBeInTheDocument();
  });

  it("should start quiz and handle next question", () => {
    window.innerWidth = 500;
    render(
      <QuizClient
        publishedQuestions={[
          {
            question: "question 1",
            answers: ["answer 1", "answer 2"],
            correctAnswer: 1,
          },
          {
            question: "question 2",
            answers: ["answer 2", "answer 3"],
            correctAnswer: 0,
          },
        ]}
      />
    );

    fireEvent.click(screen.getByText("Démarrer le Quiz"));
    fireEvent.click(screen.getByTestId("answer-1"));
    fireEvent.click(screen.getByText("Question suivante"));
    fireEvent.click(screen.getByTestId("answer-0"));

    fireEvent.click(screen.getByText("Voir mes scores"));
    expect(
      screen.getByText("Voici le résulats de vos réponses avec correction:")
    ).toBeInTheDocument();
  });

  it("should trigger slider", () => {
    window.innerWidth = 800;
    render(
      <QuizClient
        publishedQuestions={[
          {
            question: "question 1",
            answers: ["answer 1", "answer 2"],
            correctAnswer: 1,
          },
          {
            question: "question 2",
            answers: ["answer 2", "answer 3"],
            correctAnswer: 0,
          },
        ]}
      />
    );

    fireEvent.click(screen.getByText("Démarrer le Quiz"));
    fireEvent.click(screen.getByTestId("slide-score-inactive"));
    expect(screen.getByText("2 questions")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("slide-score-active"));
    expect(() => screen.getByText("2 questions")).toThrow();
  });
});
