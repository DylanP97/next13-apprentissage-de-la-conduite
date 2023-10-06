import getBlogs from "@/app/actions/getBlogs";
import prisma from "../../libs/prismadb";

jest.mock("../../libs/prismadb", () => ({
  blog: {
    findMany: jest.fn(),
  },
}));

describe("@getBlogs", () => {
  it("should return null", async () => {
    (prisma.blog.findMany as jest.Mock).mockResolvedValue(null);

    await expect(getBlogs()).rejects.toThrowError();
  });

  it("should return blog", async () => {
    (prisma.blog.findMany as jest.Mock).mockResolvedValue([
      {
        id: "1",
        title: "test blog 1",
        createdAt: new Date("2021-10-10T00:00:00.000Z"),
      },
      {
        id: "2",
        title: "test blog 2",
        createdAt: new Date("2021-10-10T00:00:00.000Z"),
      },
    ]);

    const result = await getBlogs();

    expect(result).toEqual([
      { createdAt: "2021-10-10T00:00:00.000Z", id: "1", title: "test blog 1" },
      { createdAt: "2021-10-10T00:00:00.000Z", id: "2", title: "test blog 2" },
    ]);
  });

  it("should handle exception", async () => {
    (prisma.blog.findMany as jest.Mock).mockRejectedValue(
      new Error("Test error"),
    );

    await expect(getBlogs()).rejects.toThrowError("Test error");
  });
});
