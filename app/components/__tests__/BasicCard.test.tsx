import { fireEvent, render, screen } from "@testing-library/react";
import BasicCard from "../BasicCard";

describe("@BasicCard", () => {
  it("should render @BasicCard component correctly", () => {
    const { container } = render(<BasicCard />);
    expect(container.childNodes).toHaveLength(0);
  });

  describe("@type", () => {
    it("should render component for @type=user", () => {
      render(<BasicCard type="user" />);
      expect(screen.getByText("Inscription non validée")).toBeInTheDocument();
      expect(
        screen.getByText("N'a pas souscrit à un abonnement"),
      ).toBeInTheDocument();
    });

    it("should render component for @type=createQuestion", () => {
      render(<BasicCard type="createQuestion" />);
      expect(
        screen.getByText("Ajouter une nouvelle question"),
      ).toBeInTheDocument();
    });

    it("should render component for @type=question", () => {
      render(<BasicCard type="question" />);
      expect(screen.getAllByTestId("tooltip")).toHaveLength(3);
    });

    it("should render component for @type=article", () => {
      render(<BasicCard type="article" />);
      expect(screen.getByText("Créer le Invalid Date")).toBeInTheDocument();
      expect(
        screen.getByText("Dernière modification le Invalid Date"),
      ).toBeInTheDocument();
    });
  });

  describe("@data", () => {
    it("should render component for @data=undefined", () => {
      render(<BasicCard data={undefined} type="user" />);
      expect(screen.getByText("undefined undefined")).toBeInTheDocument();
    });

    it("should render component for @data=null", () => {
      render(<BasicCard data={null} type="user" />);
      expect(screen.getByText("undefined undefined")).toBeInTheDocument();
    });
    describe("@type=user", () => {
      it("should render component with Name", () => {
        const testUser = {
          name: "test name",
        };
        render(<BasicCard data={testUser} type="user" />);
        expect(screen.getByText(testUser.name)).toBeInTheDocument();
      });

      it("should render component with FullName", () => {
        const testUser = {
          firstName: "test firstName",
          lastName: "test lastName",
        };
        render(<BasicCard data={testUser} type="user" />);
        expect(
          screen.getByText(`${testUser.firstName} ${testUser.lastName}`),
        ).toBeInTheDocument();
      });

      it("should render componentr with Email", () => {
        const testUser = {
          email: "test email",
        };
        render(<BasicCard data={testUser} type="user" />);
        expect(screen.getByText(testUser.email)).toBeInTheDocument();
      });

      it("should render component with Admin=true, isAccepter=false", () => {
        const testUser = {
          isAccepted: false,
          isAdmin: true,
        };
        render(<BasicCard data={testUser} type="user" />);
        expect(screen.getByText("Rôle Administrateur 👨🏻‍🔧")).toBeInTheDocument();
      });

      it("should render component with Admin=false, isAccepter=false", () => {
        const testUser = {
          isAccepted: false,
          isAdmin: false,
        };
        render(<BasicCard data={testUser} type="user" />);
        expect(screen.getByText("Inscription non validée")).toBeInTheDocument();
        expect(
          screen.getByText("N'a pas souscrit à un abonnement"),
        ).toBeInTheDocument();
      });

      it("should render component with Admin=false, isAccepter=true", () => {
        const testUser = {
          isAccepted: true,
          isAdmin: false,
        };
        render(<BasicCard data={testUser} type="user" />);
        expect(screen.getByText("Inscription validée")).toBeInTheDocument();
        expect(
          screen.getByText("N'a pas souscrit à un abonnement"),
        ).toBeInTheDocument();
      });

      it("should render component with Admin=true, subscriptionPlan=1", () => {
        const testUser = {
          subscriptionPlan: 1,
          isAdmin: false,
        };
        render(<BasicCard data={testUser} type="user" />);
        expect(screen.getByText("Abonnement 1 mois")).toBeInTheDocument();
      });

      it("should render component with isAccepted=false, isAdmin=false for @isMobile=false", () => {
        window.innerWidth = 500;
        const testUser = {
          isAccepted: false,
          isAdmin: false,
        };
        render(<BasicCard data={testUser} type="user" />);
        expect(screen.getByText("Valider l'utilistateur")).toBeInTheDocument();
        expect(
          screen.getByText("Promouvoir administrateur"),
        ).toBeInTheDocument();
        expect(screen.getByText("Supprimer l'utilisateur")).toBeInTheDocument();
      });

      it("should render component with isAccepted=true, isAdmin=true for @isMobile=false", () => {
        window.innerWidth = 500;
        const testUser = {
          isAccepted: true,
          isAdmin: true,
        };
        render(<BasicCard data={testUser} type="user" />);
        expect(
          screen.getByText("Enlever rôle d'administrateur"),
        ).toBeInTheDocument();
      });
    });

    describe("@type=question", () => {
      it("should render component with answers", () => {
        const testUser = {
          answers: ["test answer 1", "test answer 2"],
        };
        render(<BasicCard data={testUser} type="question" />);
        expect(screen.getByText("test answer 1")).toBeInTheDocument();
        expect(screen.getByText("test answer 2")).toBeInTheDocument();
        expect(screen.getAllByRole("img")).toHaveLength(3);
      });

      it("should trigger question-input and close it", () => {
        const testUser = {
          answers: ["test answer 1", "test answer 2"],
        };
        render(<BasicCard data={testUser} type="question" />);
        expect(screen.getByText("test answer 1")).toBeInTheDocument();
        expect(screen.getByText("test answer 2")).toBeInTheDocument();

        const images = screen.getAllByRole("img");
        fireEvent.click(images[1]);

        fireEvent.click(screen.getByText("Annuler"));
        expect(() => screen.getByRole("textbox")).toThrow();
      });

      it("should trigger question-input and trigger next step", () => {
        const testInput = "test question input";
        const testUser = {
          answers: ["test answer 1", "test answer 2"],
        };
        render(<BasicCard data={testUser} type="question" />);
        expect(screen.getByText("test answer 1")).toBeInTheDocument();
        expect(screen.getByText("test answer 2")).toBeInTheDocument();

        const images = screen.getAllByRole("img");
        fireEvent.click(images[1]);

        const input = screen.getByRole("textbox");
        expect(input).toHaveAttribute("placeholder", "Ajouter une question");
        fireEvent.change(input, { target: { value: testInput } });
        expect(screen.getByRole("textbox")).toHaveValue(testInput);

        fireEvent.click(screen.getByText("Suivant"));
        expect(() => screen.getByRole("textbox")).toThrow();
      });
    });

    describe("@type=article", () => {
      const realLocation = window.location;

      beforeAll(() => {
        (window as any).location = undefined;
        delete (window as any).location;
        window.location = { ...realLocation, assign: jest.fn() };
      });

      afterAll(() => {
        window.location = realLocation;
      });
      it("should render component with tags", () => {
        const testUser = {
          tags: ["a", "b"],
        };
        render(<BasicCard data={testUser} type="article" />);
        expect(screen.getByText("#a")).toBeInTheDocument();
        expect(screen.getByText("#b")).toBeInTheDocument();
      });

      it("should render component with id and redirect to article", () => {
        const testUser = {
          id: "test id",
        };
        render(<BasicCard data={testUser} type="article" />);
        const images = screen.getAllByRole("img");
        expect(images).toHaveLength(4);

        fireEvent.click(images[1]);
        expect(window.location.assign).toHaveBeenCalledWith(
          `/article/${testUser?.id}`,
        );
      });

      it("should render component with id and redirect to admin-edition", () => {
        const testUser = {
          id: "test id",
        };
        render(<BasicCard data={testUser} type="article" />);
        const images = screen.getAllByRole("img");
        expect(images).toHaveLength(4);

        fireEvent.click(images[2]);
        expect(window.location.assign).toHaveBeenCalledWith(
          `/admin-edition/${testUser?.id}`,
        );
      });
    });

    describe("@toggleMethod", () => {
      it("should trigger @toggleMethod for isMobil=true", () => {
        window.innerWidth = 500;
        const mockToggleMethod = jest.fn();
        const testUser = {
          id: 12,
          isAccepted: false,
          email: "test email",
          name: "test name",
        };

        render(
          <BasicCard
            type="user"
            toggleMethod={mockToggleMethod}
            data={testUser}
          />,
        );

        fireEvent.click(screen.getByText("Valider l'utilistateur"));
        expect(mockToggleMethod).toHaveBeenCalledWith(
          testUser.id,
          testUser.isAccepted,
          testUser.email,
          testUser.name,
        );
      });

      it("should trigger @toggleMethod for isMobil=false", () => {
        window.innerWidth = 800;
        const mockToggleMethod = jest.fn();
        const testUser = {
          id: 12,
          isAccepted: false,
        };

        render(
          <BasicCard
            type="user"
            toggleMethod={mockToggleMethod}
            data={testUser}
          />,
        );

        fireEvent.click(screen.getByAltText("accepted"));
        expect(mockToggleMethod).toHaveBeenCalledWith(
          testUser.id,
          testUser.isAccepted,
        );
      });

      it("should trigger @toggleMethod for type=question", () => {
        const mockToggleMethod = jest.fn();
        const testUser = {
          id: 12,
          published: false,
        };

        render(
          <BasicCard
            type="question"
            toggleMethod={mockToggleMethod}
            data={testUser}
          />,
        );

        fireEvent.click(screen.getAllByAltText("view")[0]);
        expect(mockToggleMethod).toHaveBeenCalledWith(
          testUser.id,
          testUser.published,
        );
      });

      it("should trigger @toggleMethod for type=article", () => {
        const mockToggleMethod = jest.fn();
        const testUser = {
          id: 12,
          published: true,
        };

        render(
          <BasicCard
            type="article"
            toggleMethod={mockToggleMethod}
            data={testUser}
          />,
        );

        fireEvent.click(screen.getAllByAltText("view")[0]);
        expect(mockToggleMethod).toHaveBeenCalledWith(
          testUser.id,
          testUser.published,
        );
      });
    });

    describe("@toggleMethod2", () => {
      it("should render trigger @toggleMethod2 for isMobil=true", () => {
        window.innerWidth = 500;
        const mockToggleMethod2 = jest.fn();
        const testUser = {
          id: 12,
          isAdmin: true,
        };

        render(
          <BasicCard
            type="user"
            toggleMethod2={mockToggleMethod2}
            data={testUser}
          />,
        );

        fireEvent.click(screen.getByText("Enlever rôle d'administrateur"));
        expect(mockToggleMethod2).toHaveBeenCalledWith(
          testUser.id,
          testUser.isAdmin,
        );
      });

      it("should render trigger @toggleMethod2 for isMobil=false", () => {
        window.innerWidth = 800;
        const mockToggleMethod2 = jest.fn();
        const testUser = {
          id: 12,
          isAdmin: true,
        };

        render(
          <BasicCard
            type="user"
            toggleMethod2={mockToggleMethod2}
            data={testUser}
          />,
        );

        fireEvent.click(screen.getByAltText("admin"));
        expect(mockToggleMethod2).toHaveBeenCalledWith(
          testUser.id,
          testUser.isAdmin,
        );
      });
    });

    describe("@deleteMethod", () => {
      it("should trigger @deleteMethod for isMobile=false", () => {
        window.innerWidth = 800;
        const mockDeleteMethod = jest.fn();
        const testUser = {
          id: 12,
        };

        render(
          <BasicCard
            type="user"
            deleteMethod={mockDeleteMethod}
            data={testUser}
          />,
        );

        fireEvent.click(screen.getByAltText("trash"));
        expect(mockDeleteMethod).toHaveBeenCalledWith(testUser.id);
      });

      it("should trigger @deleteMethod for isMobile=true", () => {
        window.innerWidth = 400;
        const mockDeleteMethod = jest.fn();
        const testUser = {
          id: 12,
        };

        render(
          <BasicCard
            type="user"
            deleteMethod={mockDeleteMethod}
            data={testUser}
          />,
        );

        fireEvent.click(screen.getByText("Supprimer l'utilisateur"));
        expect(mockDeleteMethod).toHaveBeenCalledWith(testUser.id);
      });

      it("should trigger @deleteMethod for type=question", () => {
        const mockDeleteMethod = jest.fn();
        const testUser = {
          id: 12,
        };

        render(
          <BasicCard
            type="question"
            deleteMethod={mockDeleteMethod}
            data={testUser}
          />,
        );

        fireEvent.click(screen.getByAltText("trash"));
        expect(mockDeleteMethod).toHaveBeenCalledWith(testUser.id);
      });

      it("should trigger @deleteMethod for type=article", () => {
        const mockDeleteMethod = jest.fn();
        const testUser = {
          id: 12,
        };

        render(
          <BasicCard
            type="article"
            deleteMethod={mockDeleteMethod}
            data={testUser}
          />,
        );

        fireEvent.click(screen.getAllByTestId("tooltip")[3]);
        expect(mockDeleteMethod).toHaveBeenCalledWith(testUser.id);
      });
    });

    describe("@createNewQuestion", () => {
      it("should render trigger new creation of question", () => {
        render(<BasicCard type="createQuestion" />);

        const createQuestion = screen.getByTestId("BasicCard-createQuestion");
        fireEvent.click(createQuestion);

        expect(
          screen.getByText("La question ne peut pas être vide"),
        ).toBeInTheDocument();
      });

      it("should save new question", () => {
        const testInput = "test question input";

        render(<BasicCard type="createQuestion" />);

        const createQuestion = screen.getByTestId("BasicCard-createQuestion");
        fireEvent.click(createQuestion);

        const input = screen.getByRole("textbox");
        expect(input).toHaveAttribute("placeholder", "Ajouter une question");
        fireEvent.change(input, { target: { value: testInput } });
        expect(screen.getByRole("textbox")).toHaveValue(testInput);

        fireEvent.click(screen.getByText("Suivant"));
        expect(() => screen.getByRole("textbox")).toThrow();
      });
    });
  });
});
