import getBlogById from "@/app/actions/getBlogById";
import prisma from "../../libs/prismadb";

jest.mock("../../libs/prismadb", () => ({
  blog: {
    findUnique: jest.fn(),
  },
}));

describe("@getBlogById", () => {
  it("should return error", async () => {
    (prisma.blog.findUnique as jest.Mock).mockResolvedValue(null);

    await expect(getBlogById({ articleId: "1" })).rejects.toThrowError(
      "Error: Invalid Blog"
    );
  });

  it("should return blog", async () => {
    (prisma.blog.findUnique as jest.Mock).mockResolvedValue({
      id: "2",
      title: "test unique",
    });

    const result = await getBlogById({
      articleId: "1",
    });

    expect(result).toEqual({
      id: "2",
      title: "test unique",
    });
  });

  it("should handle exception", async () => {
    (prisma.blog.findUnique as jest.Mock).mockRejectedValue(
      new Error("Test error")
    );

    await expect(getBlogById({ articleId: "123" })).rejects.toThrowError(
      "Test error"
    );
  });
});
