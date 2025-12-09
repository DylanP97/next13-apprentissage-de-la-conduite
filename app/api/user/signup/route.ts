import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import validator from "validator";

const { ObjectId } = require("mongodb");

// Conditional Postmark initialization
let postmarkApp: any = null;
if (process.env.POSTMARK_API) {
  const postmark = require("postmark");
  postmarkApp = new postmark.ServerClient(process.env.POSTMARK_API);
}

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

    // Step 2: Only send emails if Postmark is configured
    if (postmarkApp && process.env.POSTMARK_EMAIL) {
      try {
        await postmarkApp.sendEmail({
          From: process.env.POSTMARK_EMAIL,
          To: email,
          Subject: `Bonjour ${firstName}! Votre demande d'inscription a bien été reçue`,
          TextBody: `Votre demande d'inscription a bien été reçue. Nous reviendrons très rapidement vers vous pour valider votre inscription.`,
          MessageStream: "outbound",
        });

        await postmarkApp.sendEmail({
          From: process.env.POSTMARK_EMAIL,
          To: process.env.POSTMARK_EMAIL,
          Subject: `Un nouvel utilisateur a fait une demande d'inscription`,
          TextBody: `Vérifiez ses informations : ${email} ; ${firstName} ${lastName}`,
          MessageStream: "outbound",
        });

        console.log("Postmark emails sent successfully");
      } catch (err: any) {
        console.error("Postmark send failed:", err.message);
      }
    } else {
      console.log("Postmark not configured, skipping email send.");
    }

    return NextResponse.json({ message: "Signup route success (email sending skipped if not configured)" });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
