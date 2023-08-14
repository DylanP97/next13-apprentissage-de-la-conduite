import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import validator from "validator";

const { ObjectId } = require("mongodb");

interface Errors {
  email?: string;
  password?: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, firstName, lastName, password } = body;
    const errors: Errors = {};

    if (!validator.isEmail(email)) {
      errors.email = "Ceci ne ressemble pas à une adresse email correcte.";
    }

    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(password)) {
      errors.password =
        "Le mot de passe doit contenir au moins 8 caractères, dont une lettre majuscule, une lettre minuscule et un chiffre.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(errors, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        id: new ObjectId().toHexString(),
        email,
        firstName,
        lastName,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}