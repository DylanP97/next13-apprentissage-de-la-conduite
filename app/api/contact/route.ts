import { NextResponse } from "next/server";
import { transporter, contactMail } from "@/app/libs/transporter";

// export async function POST(request: Request) {
//   const body = await request.json();
//   const { email, firstName, message } = body.data;

//   const contactFunc = contactMail(email, firstName, message);

//   await transporter.sendMail(contactFunc, function (error: any) {
//     if (error) return NextResponse.error();
//   });

//   return NextResponse.json({ message : "L'email a bien été envoyé", status: 200 });
// }




async function POST(request: Request) {
  const body = await request.json();
  const { email, firstName, message } = body.data;

  const contactFunc = contactMail(email, firstName, message);

  await transporter.sendMail(contactFunc, function (error: any) {
    if (error) return NextResponse.error();
  });

  return NextResponse.json({ message : "L'email a bien été envoyé", status: 200 });
}

async function within(fn: any, res: any, duration: any) {
    const id = setTimeout(() => res.json({
        message: "There was an error with the upstream service!"
    }), duration)
    
    try {
        let data = await fn()
        clearTimeout(id)
        res.json(data)
    } catch(e: any) {
      res.status(500).json({message: e.message})
    }
}


module.exports = async (req: any, res: any) => {
    await within(POST, res, 7000)
}
