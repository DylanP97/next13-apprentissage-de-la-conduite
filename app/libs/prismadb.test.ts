import client from "./prismadb"; // Import your Prisma client

describe("@prisma-client", () => {
  it("should initialize the client", () => {
    expect(client).toBeDefined();
  });

  it("should return client instance", () => {
    expect(client.$connect).toBeInstanceOf(Function);
    expect(client.$disconnect).toBeInstanceOf(Function);
  });
});
