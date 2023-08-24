const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
import { buffer } from "micro";
import { NextResponse } from "next/server";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export async function POST(req: any, res: any) {
  const signature = req.headers["stripe-signature"];
  const signingSecret = process.env.STRIPE_SIGNING_SECRET;
  const reqBuffer = await buffer(req);

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