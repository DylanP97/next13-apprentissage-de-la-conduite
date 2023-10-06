import getCurrentUser, { getSession } from "@/app/actions/getCurrentUser";
import { getServerSession } from "next-auth/next";
import prisma from "../../libs/prismadb";

jest.mock("../../libs/prismadb", () => ({
  user: {
    findUnique: jest.fn(),
  },
}));

jest.mock("next-auth/next", () => ({
  getServerSession: jest.fn(),
}));

jest.mock("../../../pages/api/auth/[...nextauth]", () => ({
  authOptions: {},
}));

const testTimestamp = "2021-10-10T00:00:00.000Z";

describe("@getCurrentUser", () => {
  it("should return null if @getServerSession user is empty", async () => {
    (getServerSession as jest.Mock).mockResolvedValue({ user: {} });

    const response = await getCurrentUser();
    expect(response).toBeNull();
  });

  it("should return null if @getServerSession fails", async () => {
    (getServerSession as jest.Mock).mockRejectedValue(new Error("Test error"));
    expect(await getCurrentUser()).toBeNull();
  });

  it("should return null if @prisma returns null", async () => {
    (getServerSession as jest.Mock).mockResolvedValue({
      user: {
        email: "test@email.com",
      },
    });
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    const response = await getCurrentUser();
    expect(response).toBeNull();
  });

  it("should return unique user", async () => {
    (getServerSession as jest.Mock).mockResolvedValue({
      user: {
        email: "test@email.com",
      },
    });
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      createdAt: new Date(testTimestamp),
      updatedAt: new Date(testTimestamp),
      emailVerified: new Date(testTimestamp),
      email: "test@email.com",
    });

    const response = await getCurrentUser();
    expect(response).toEqual({
      createdAt: testTimestamp,
      emailVerified: testTimestamp,
      updatedAt: testTimestamp,
      email: "test@email.com",
    });
  });

  it("should return unique user without emailVerification", async () => {
    (getServerSession as jest.Mock).mockResolvedValue({
      user: {
        email: "test@email.com",
      },
    });
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      createdAt: new Date(testTimestamp),
      updatedAt: new Date(testTimestamp),
    });

    const response = await getCurrentUser();
    expect(response).toEqual({
      createdAt: testTimestamp,
      emailVerified: null,
      updatedAt: testTimestamp,
    });
  });

  it("should handle exception", async () => {
    (prisma.user.findUnique as jest.Mock).mockRejectedValue(
      new Error("Test error")
    );

    expect(await getCurrentUser()).toBeNull();
  });
});

describe("@getSession", () => {
  it("should return user", async () => {
    (getServerSession as jest.Mock).mockResolvedValue({ user: {} });

    expect(await getSession()).toEqual({ user: {} });
  });

  it("should throw error", async () => {
    (getServerSession as jest.Mock).mockRejectedValue(new Error("Test error"));

    await expect(getSession()).rejects.toThrowError("Test error");
  });
});
