import getPublishedQuestions from "@/app/actions/getPublishedQuestions";
import prisma from "../../libs/prismadb";

jest.mock("../../libs/prismadb", () => ({
  question: {
    findMany: jest.fn(),
  },
}));

describe("@getPublishedQuestions", () => {
  it("should return null if no questions are found", async () => {
    (prisma.question.findMany as jest.Mock).mockReturnValue(null);

    await expect(getPublishedQuestions()).rejects.toThrowError();
  });

  it("should return questions", async () => {
    (prisma.question.findMany as jest.Mock).mockReturnValue([
      {
        createdAt: new Date("2021-10-10T00:00:00.000Z"),
        id: "1",
      },
      {
        createdAt: new Date("2021-10-10T00:00:00.000Z"),
        id: "2",
      },
    ]);

    expect(await getPublishedQuestions()).toEqual([
      {
        createdAt: "2021-10-10T00:00:00.000Z",
        id: "1",
      },
      {
        createdAt: "2021-10-10T00:00:00.000Z",
        id: "2",
      },
    ]);
  });
});
