import { NextResponse } from "next/server";
import { transporter, contactMail } from "@/app/libs/transporter";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.error();
    }

    const body = await request.json();
    const { email, firstName, message } = body.data;

    const contactFunc = contactMail(email, firstName, message);

    await transporter.sendMail(contactFunc, function (error: any, info: any) {
      if (error) return NextResponse.error();
    });

    return NextResponse.json({});
  } catch (error: any) {
    console.log(error)
  }
}
