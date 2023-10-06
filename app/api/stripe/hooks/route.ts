const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
import { buffer } from "micro";
import { NextResponse } from "next/server";
import bodyParser from "body-parser";

export async function POST(req: any, res: any) {
  const signature = req.headers["stripe-signature"];
  const signingSecret = process.env.STRIPE_SIGNING_SECRET;
  const reqBuffer = await buffer(req);

  const rawBody: any = await new Promise((resolve) => {
    bodyParser.raw({ type: "application/json" })(req, res, () => {
      resolve(req.body);
    });
  });

  const body = rawBody.toString();
  console.log(body);

  let event;

  try {
    event = stripe.webhooks.constructEvent(reqBuffer, signature, signingSecret);
  } catch (error: any) {
    return NextResponse.json({
      status: 400,
      message: `Webhook error: ${error?.message}`,
    });
  }

  console.log({ event });
  return NextResponse.json({ received: true, status: 200 });
}

// export async function POST(req: any, res: any) {
//   // Use the raw mode of the body-parser module to get the raw request body
//   const rawBody = await new Promise((resolve) => {
//     bodyParser.raw({ type: 'application/json' })(req, res, () => {
//       resolve(req.body);
//     });
//   });

//   // Convert the raw buffer to a string using toString()
//   const body = rawBody.toString();

//   // Do something with the request body
//   console.log(body);

//   return NextResponse.json({ received: true, status: 200 });
// }
