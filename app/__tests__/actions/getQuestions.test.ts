import getQuestions from "@/app/actions/getQuestions";
import prisma from "../../libs/prismadb";

jest.mock("../../libs/prismadb", () => ({
  question: {
    findMany: jest.fn(),
  },
}));

describe("@getQuestions", () => {
  it("should return null", async () => {
    (prisma.question.findMany as jest.Mock).mockResolvedValue(null);

    await expect(getQuestions()).rejects.toThrowError();
  });

  it("should return question", async () => {
    (prisma.question.findMany as jest.Mock).mockResolvedValue([
      {
        id: "1",
        title: "test question 1",
        createdAt: new Date("2021-10-10T00:00:00.000Z"),
      },
      {
        id: "2",
        title: "test question 2",
        createdAt: new Date("2021-10-10T00:00:00.000Z"),
      },
    ]);

    const result = await getQuestions();

    expect(result).toEqual([
      {
        createdAt: "2021-10-10T00:00:00.000Z",
        id: "1",
        title: "test question 1",
      },
      {
        createdAt: "2021-10-10T00:00:00.000Z",
        id: "2",
        title: "test question 2",
      },
    ]);
  });

  it("should handle exception", async () => {
    (prisma.question.findMany as jest.Mock).mockRejectedValue(
      new Error("Test error"),
    );

    await expect(getQuestions()).rejects.toThrowError("Test error");
  });
});
