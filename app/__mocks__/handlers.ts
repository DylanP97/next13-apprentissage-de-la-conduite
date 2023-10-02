import { rest } from "msw";

export const handlers = [
  rest.get("/blogs", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          createdAt: "dsdsd",
          updatedAt: "dsdsd",
          id: "dsdsd3345345",
          title: "Thisiesisdfd",
          content: "dsdsd",
          author: {
            createdAt: "dsdsd",
            updatedAt: "dsdsd",
            emailVerified: false,
            id: "dsdsd",
            firstName: "dsdsd",
            lastName: "dsdsd",
            name: "dsdsd",
            email: "dsdsd",
            hashedPassword: "<PASSWORD>",
            subscriptionPlan: 5,
          },
        },
        {
          createdAt: "dsdsd",
          updatedAt: "dsdsd",
          id: "dsds32132123d",
          title: "dsdsd",
          content: "dsdsd",
          author: {
            createdAt: "dsdsd",
            updatedAt: "dsdsd",
            emailVerified: false,
            id: "aadsqdsq",
            firstName: "dsdsd",
            lastName: "dsdsd",
            name: "dsdsd",
            email: "dsdsd",
            hashedPassword: "<PASSWORD>",
            subscriptionPlan: 5,
          },
        },
        {
          createdAt: "dsdsd",
          updatedAt: "dsdsd",
          id: "d876873sdsd",
          title: "sdcdscs",
          content: "dsdsd",
          author: {
            createdAt: "dsdsd",
            updatedAt: "dsdsd",
            emailVerified: false,
            id: "dsdsd",
            firstName: "dsdsd",
            lastName: "dsdsd",
            name: "dsdsd",
            email: "dsdsd",
            hashedPassword: "<PASSWORD>",
            subscriptionPlan: 5,
          },
        },
      ])
    );
  }),
];
