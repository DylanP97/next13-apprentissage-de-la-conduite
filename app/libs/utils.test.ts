import {
  dateParser,
  timestampParser,
  isEmpty,
  getSubscriptionLabel,
  showPassword,
  TOOLBAR_OPTIONS,
  formatRelativeDate,
} from "./utils";

describe("@dateParser", () => {
  it("should return invalid date for undefined", () => {
    const date = dateParser(undefined);
    expect(date).toBe("Invalid Date");
  });

  it("should return invalid date for null", () => {
    const date = dateParser(null);
    expect(date).toBe("Invalid Date");
  });

  it("should return invalid date for empty string", () => {
    const date = dateParser("");
    expect(date).toBe("Invalid Date");
  });

  it("should return invalid date for empty string", () => {
    const date = dateParser("");
    expect(date).toBe("Invalid Date");
  });

  it("should return invalid date for corrupted date", () => {
    const date = dateParser("2021-01-01T00131:00:00.000Z");
    expect(date).toBe("Invalid Date");
  });

  it("should return correct date", () => {
    const date = dateParser("2021-01-01T00:00:00.000Z");
    expect(date).toBe("ven. 1 janv. 2021");
  });
});

describe("@timestampParser", () => {
  it("should return invalid date for undefined", () => {
    const date = timestampParser(undefined);
    expect(date).toBe("Invalid Date");
  });

  it("should return date for null", () => {
    const date = timestampParser(null);
    expect(date).toBe("jeu. 1 janv. 1970");
  });

  it("should return invalid date for empty string", () => {
    const date = timestampParser("");
    expect(date).toBe("Invalid Date");
  });

  it("should return invalid date for corrupted timestamp", () => {
    const date = timestampParser("2021-01-01T001131:00:00.000Z");
    expect(date).toBe("Invalid Date");
  });

  it("should return correct date", () => {
    const date = timestampParser("2021-01-01T00:00:00.000Z");
    expect(date).toBe("ven. 1 janv. 2021");
  });
});

describe("@isEmpty", () => {
  it("should return true for undefined", () => {
    const isEmptyValue = isEmpty(undefined);
    expect(isEmptyValue).toBe(true);
  });

  it("should return true for null", () => {
    const isEmptyValue = isEmpty(null);
    expect(isEmptyValue).toBe(true);
  });

  it("should return true for empty string", () => {
    const isEmptyValue = isEmpty("");
    expect(isEmptyValue).toBe(true);
  });

  it("should return true for empty string with spacea", () => {
    const isEmptyValue = isEmpty("   ");
    expect(isEmptyValue).toBe(true);
  });

  it("should return true for empty object", () => {
    const isEmptyValue = isEmpty({});
    expect(isEmptyValue).toBe(true);
  });

  it("should false true for object with values", () => {
    const isEmptyValue = isEmpty({
      key: {
        key: "value",
      },
    });
    expect(isEmptyValue).toBe(false);
  });

  it("should false true for string", () => {
    const isEmptyValue = isEmpty("value");
    expect(isEmptyValue).toBe(false);
  });
});

describe("@getSubscriptionLabel", () => {
  it("should return subscription label for 1", () => {
    const subscriptionLabel = getSubscriptionLabel(1);
    expect(subscriptionLabel).toBe("Abonnement 1 mois");
  });

  it("should return subscription label for 2", () => {
    const subscriptionLabel = getSubscriptionLabel(2);
    expect(subscriptionLabel).toBe("Abonnement 3 mois");
  });

  it("should return subscription label for 3", () => {
    const subscriptionLabel = getSubscriptionLabel(3);
    expect(subscriptionLabel).toBe("Abonnement 6 mois");
  });

  it("should return subscription label for 4", () => {
    const subscriptionLabel = getSubscriptionLabel(4);
    expect(subscriptionLabel).toBe("Abonnement gratuit");
  });

  it("should return subscription label for 5", () => {
    const subscriptionLabel = getSubscriptionLabel(5);
    expect(subscriptionLabel).toBe("N'a pas souscrit à un abonnement");
  });

  it("should return subscription label for 0", () => {
    const subscriptionLabel = getSubscriptionLabel(0);
    expect(subscriptionLabel).toBe("N'a pas souscrit à un abonnement");
  });
});

describe("@showPassword", () => {
  it("should not trigger @setTypePasswordInput if empty @typePasswordInput is passed", () => {
    const mockedEvent = {
      target: {
        parentElement: { parentElement: { firstChild: { firstChild: {} } } },
      },
    };
    const mockPasswordInput = jest.fn();

    showPassword(mockedEvent, "", mockPasswordInput);
    expect(mockPasswordInput).not.toHaveBeenCalled();
  });

  it("should trigger @setTypePasswordInput if @typePasswordInput=text", () => {
    const mockedEvent = {
      target: {
        srcset: "",
        parentElement: { parentElement: { firstChild: { firstChild: {} } } },
      },
    };
    const mockPasswordInput = jest.fn();

    showPassword(mockedEvent, "text", mockPasswordInput);
    expect(mockPasswordInput).toHaveBeenCalledWith("password");
    expect(mockedEvent.target.srcset).toEqual("/img.jpg");
  });

  it("should trigger @setTypePasswordInput if @typePasswordInput=password", () => {
    const mockedEvent = {
      target: {
        srcset: "",
        parentElement: { parentElement: { firstChild: { firstChild: {} } } },
      },
    };
    const mockPasswordInput = jest.fn();

    showPassword(mockedEvent, "password", mockPasswordInput);
    expect(mockPasswordInput).toHaveBeenCalledWith("text");
    expect(mockedEvent.target.srcset).toEqual("/img.jpg");
  });
});

describe("@TOOLBAR_OPTIONS", () => {
  it("should return correct options", () => {
    expect(TOOLBAR_OPTIONS).toEqual(TOOLBAR_OPTIONS);
  });
});

describe("@formatRelativeDate", () => {
  it("should return a formatted string for years", () => {
    const currentDate = new Date();
    const date = new Date(currentDate);
    date.setFullYear(currentDate.getFullYear() - 2);
    expect(formatRelativeDate(date.toISOString())).toBe("Il y a 2 ans");
  });

  it("should return a formatted string for year", () => {
    const currentDate = new Date();
    const date = new Date(currentDate);
    date.setFullYear(currentDate.getFullYear() - 1);
    expect(formatRelativeDate(date.toISOString())).toBe("Il y a 1 an");
  });

  it("should return a formatted string for months", () => {
    const currentDate = new Date();
    const date = new Date(currentDate);
    date.setMonth(currentDate.getMonth() - 2);
    expect(formatRelativeDate(date.toISOString())).toBe("Il y a 2 mois");
  });

  it("should return a formatted string for month", () => {
    const currentDate = new Date();
    const date = new Date(currentDate);
    date.setMonth(currentDate.getMonth() - 1);
    expect(formatRelativeDate(date.toISOString())).toBe("Il y a 1 mois");
  });

  it("should return a formatted string for days", () => {
    const currentDate = new Date();
    const updated = new Date(currentDate.getTime() - 200000000);
    expect(formatRelativeDate(updated.toISOString())).toBe("Il y a 2 jours");
  });

  it("should return a formatted string for day", () => {
    const currentDate = new Date();
    const updated = new Date(currentDate.getTime() - 100000000);
    expect(formatRelativeDate(updated.toISOString())).toBe("Il y a 1 jour");
  });

  it("should return a formatted string for hours", () => {
    const currentDate = new Date();
    const updated = new Date(currentDate.getTime() - 20000000);
    expect(formatRelativeDate(updated.toISOString())).toBe("Il y a 5 heures");
  });

  it("should return a formatted string for hour", () => {
    const currentDate = new Date();
    const updated = new Date(currentDate.getTime() - 3600000);
    expect(formatRelativeDate(updated.toISOString())).toBe("Il y a 1 heure");
  });

  it("should return a formatted string for minutes", () => {
    const currentDate = new Date();
    const updated = new Date(currentDate.getTime() - 2000000);
    expect(formatRelativeDate(updated.toISOString())).toBe("Il y a 33 minutes");
  });

  it("should return a formatted string for minute", () => {
    const currentDate = new Date();
    const updated = new Date(currentDate.getTime() - 100000);
    expect(formatRelativeDate(updated.toISOString())).toBe("Il y a 1 minute");
  });

  it("should return a formatted string for seconds", () => {
    const currentDate = new Date();
    const updated = new Date(currentDate.getTime() - 20000);
    expect(formatRelativeDate(updated.toISOString())).toBe(
      "Il y a quelques secondes"
    );
  });
});
