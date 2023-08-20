import { NextResponse } from "next/server";
import { transporter, contactMail } from "@/app/libs/transporter";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, firstName, message } = body.data;

    const contactFunc = contactMail(email, firstName, message);

    await transporter.sendMail(contactFunc, function (error: any) {
      if (error) console.log(error)
      return NextResponse.json({message: "L'email a bien été envoyé", status: 200 });
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
