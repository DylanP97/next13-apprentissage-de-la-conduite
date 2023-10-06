import getPublishedBlogs from "@/app/actions/getPublishedBlogs";
import prisma from "../../libs/prismadb";

jest.mock("../../libs/prismadb", () => ({
  blog: {
    findMany: jest.fn(),
  },
}));

describe("@getPublishedBlogs", () => {
  it("should return null if no blogs are found", async () => {
    (prisma.blog.findMany as jest.Mock).mockReturnValue(null);

    await expect(getPublishedBlogs()).rejects.toThrowError();
  });

  it("should return blogs", async () => {
    (prisma.blog.findMany as jest.Mock).mockReturnValue([
      {
        createdAt: new Date("2021-10-10T00:00:00.000Z"),
        id: "1",
      },
      {
        createdAt: new Date("2021-10-10T00:00:00.000Z"),
        id: "2",
      },
    ]);

    expect(await getPublishedBlogs()).toEqual([
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
