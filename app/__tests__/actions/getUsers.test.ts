import getUsers from "@/app/actions/getUsers";
import prisma from "../../libs/prismadb";

jest.mock("../../libs/prismadb", () => ({
  user: {
    findMany: jest.fn(),
  },
}));

describe("@getUsers", () => {
  it("should return null", async () => {
    (prisma.user.findMany as jest.Mock).mockResolvedValue(null);

    await expect(getUsers()).rejects.toThrowError();
  });

  it("should return user", async () => {
    (prisma.user.findMany as jest.Mock).mockResolvedValue([
      {
        id: "1",
        title: "test user 1",
        createdAt: new Date("2021-10-10T00:00:00.000Z"),
      },
      {
        id: "2",
        title: "test user 2",
        createdAt: new Date("2021-10-10T00:00:00.000Z"),
      },
    ]);

    const result = await getUsers();

    expect(result).toEqual([
      { createdAt: "2021-10-10T00:00:00.000Z", id: "1", title: "test user 1" },
      { createdAt: "2021-10-10T00:00:00.000Z", id: "2", title: "test user 2" },
    ]);
  });

  it("should handle exception", async () => {
    (prisma.user.findMany as jest.Mock).mockRejectedValue(
      new Error("Test error"),
    );

    await expect(getUsers()).rejects.toThrowError("Test error");
  });
});
