import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import validator from "validator";
import { transporter, newSignUpRequest, signUpRequestReceived} from "@/app/libs/transporter"

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

    await transporter.sendMail(newSignUpRequest(email, firstName, lastName), function (error: any) {
      if (error) return NextResponse.error();
    });
    
    await transporter.sendMail(signUpRequestReceived(email, firstName), function (error: any) {
      if (error) return NextResponse.error();
    });  

    return NextResponse.json({ message : 'Signup route success'});
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}