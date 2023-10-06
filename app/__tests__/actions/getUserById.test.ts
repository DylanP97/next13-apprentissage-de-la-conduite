import getUserById from "@/app/actions/getUserById";
import prisma from "../../libs/prismadb";

jest.mock("../../libs/prismadb", () => ({
  user: {
    findUnique: jest.fn(),
  },
}));

describe("@getUserById", () => {
  it("should return null", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    const result = await getUserById("1");

    expect(result).toBeNull();
  });

  it("should return user without email, name", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: "2",
    });

    const result = await getUserById("1");

    expect(result).toEqual({
      email: null,
      firstName: null,
      lastName: null,
    });
  });

  it("should return user with email, name", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      email: "test@email.com",
      firstName: "test first name",
      lastName: "test last name",
    });

    const result = await getUserById("1");

    expect(result).toEqual({
      email: "test@email.com",
      firstName: "test first name",
      lastName: "test last name",
    });
  });

  it("should handle exception", async () => {
    (prisma.user.findUnique as jest.Mock).mockRejectedValue(
      new Error("Test error"),
    );

    await expect(getUserById("123")).rejects.toThrowError("Test error");
  });
});
