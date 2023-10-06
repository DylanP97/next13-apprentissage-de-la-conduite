import getQuestionById from "@/app/actions/getQuestionById";
import prisma from "../../libs/prismadb";

jest.mock("../../libs/prismadb", () => ({
  question: {
    findUnique: jest.fn(),
  },
}));

describe("@getQuestionById", () => {
  it("should return null", async () => {
    (prisma.question.findUnique as jest.Mock).mockResolvedValue(null);

    await expect(getQuestionById({ questionId: "1" })).rejects.toThrowError(
      "Error: Invalid question"
    );
  });

  it("should return question", async () => {
    (prisma.question.findUnique as jest.Mock).mockResolvedValue({
      id: "2",
      title: "test unique",
    });

    const result = await getQuestionById({
      questionId: "1",
    });

    expect(result).toEqual({
      id: "2",
      title: "test unique",
    });
  });

  it("should handle exception", async () => {
    (prisma.question.findUnique as jest.Mock).mockRejectedValue(
      new Error("Test error")
    );

    await expect(getQuestionById({ questionId: "123" })).rejects.toThrowError(
      "Test error"
    );
  });
});
