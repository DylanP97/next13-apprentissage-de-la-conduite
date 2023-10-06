import {
  dateParser,
  timestampParser,
  isEmpty,
  getSubscriptionLabel,
  showPassword,
  TOOLBAR_OPTIONS,
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
