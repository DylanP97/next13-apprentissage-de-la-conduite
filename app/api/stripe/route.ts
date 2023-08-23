import { NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
import subscriptionPlans from "@/app/libs/subscriptionPlans";
import handleEvent from "./handleEvent";
import { buffer } from 'micro'


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, userId } = body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: items.map((item: { id: number; quantity: any }) => {
        const storeItem = subscriptionPlans.get(item.id);
        return {
          price: storeItem?.productId,
          quantity: item.quantity,
        };
      }),
      success_url: process.env.BASE_URL,
      cancel_url: process.env.BASE_URL,
      metadata: {
        plan_id: items[0].id,
        id: userId,
      },
    })

    return NextResponse.json({ message: session.url, status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ message: error.message, status: 500 });
  }
}

// stripe.on('payment_pages.submit_payment.success', () => {
//   handleEvent(session, session.metadata.plan_id)
// })

// stripe.on('submit_payment.success', () => {
//   handleEvent(session, session.metadata.plan_id)
// })


export const handler = async (req: any, res: any) => {
  const signature = req.headers["stripe-signature"];
  const signingSecret = process.env.STRIPE_SIGNING_SECRET;
  const reqBuffer = await buffer(req)

  let event 

  try {
    event = stripe.webhooks.constructEvent(reqBuffer, signature, signingSecret);
  } catch (error: any) {
    return res.status(400).send(`Webhook error: ${error?.message}`)
  }

  console.log({ event })



  res.send({ received: true });
};