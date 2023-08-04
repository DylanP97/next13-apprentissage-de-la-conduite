import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";

const { ObjectId } = require('mongodb');

export async function POST(
  request: Request, 
) {
  const body = await request.json();

  const { 
    email,
    firstName,
    lastName,
    password,
   } = body;

   const hashedPassword = await bcrypt.hash(password, 12);

   const user = await prisma.user.create({
    data: {
      id: new ObjectId().toHexString(),
      email,
      firstName,
      lastName,
      hashedPassword,
    }
  });

  return NextResponse.json(user);
}
