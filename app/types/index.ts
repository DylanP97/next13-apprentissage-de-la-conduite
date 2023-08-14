import { Question } from "@prisma/client";
import { Blog } from "@prisma/client";
import { User } from "@prisma/client";

export type SafeQuestion = Omit<Question, "createdAt"> & {
  createdAt: string;
};

export type SafeBlog = Omit<Blog, "createdAt"> & {
  createdAt: string;
};

export type SafeUser = Omit<User, "createdAt" | "emailVerified"> & {
  createdAt: string;
  emailVerified: string | null;
};
