import { NextResponse } from "next/server";
import { transporter, contactMail } from "@/app/libs/transporter";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, firstName, message } = body.data;

  const contactFunc = contactMail(email, firstName, message);

  await transporter.sendMail(contactFunc, function (error: any) {
    if (error) return NextResponse.error();
  });

  return NextResponse.json({ message : "L'email a bien été envoyé", status: 200 });
}
