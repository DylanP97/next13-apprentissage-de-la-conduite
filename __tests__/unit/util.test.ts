import { getSubscriptionLabel } from "../../app/libs/utils";

test("returns correct label for subscription plans", () => {
  const subscriptionLabel1 = getSubscriptionLabel(1);
  const subscriptionLabel2 = getSubscriptionLabel(2);
  const subscriptionLabel3 = getSubscriptionLabel(3);
  const subscriptionLabel4 = getSubscriptionLabel(4);
  const subscriptionLabelOther = getSubscriptionLabel(5);

  expect(subscriptionLabel1).toBe("Abonnement 1 mois");
  expect(subscriptionLabel2).toBe("Abonnement 3 mois");
  expect(subscriptionLabel3).toBe("Abonnement 6 mois");
  expect(subscriptionLabel4).toBe("Abonnement gratuit");
  expect(subscriptionLabelOther).toBe("N'a pas souscrit à un abonnement");
});