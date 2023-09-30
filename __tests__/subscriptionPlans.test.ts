import subscriptionPlans from "@/app/libs/subscriptionPlans";

describe("subscriptionPlans", () => {
  it("should have plans defined", () => {
    expect(subscriptionPlans.size).toBeGreaterThan(0);
  });

  it("should have correct values for 1 month plan", () => {
    const plan = subscriptionPlans.get(1);
    if (!plan) {
      throw new Error("Plan not found");
    }

    const oneMonthPlan: {
      priceInCents: number;
      name: string;
      productId: string;
    } = plan;
    expect(oneMonthPlan.priceInCents).toBe(999);
    expect(oneMonthPlan.name).toBe("Abonnement d'un mois");
    expect(oneMonthPlan.productId).toBe("price_1NhUlaFgJQlKBjkeY3HvEt0g");
  });

  // Add tests for other plans...
});
