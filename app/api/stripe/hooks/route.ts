const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
import { buffer } from "micro";

export default async function handler(req: any, res: any) {
    const signature = req.headers["stripe-signature"];
    const signingSecret = process.env.STRIPE_SIGNING_SECRET;
    const reqBuffer = await buffer(req);
  
    let event;
  
    try {
      event = stripe.webhooks.constructEvent(reqBuffer, signature, signingSecret);
    } catch (error: any) {
      return res.status(400).send(`Webhook error: ${error?.message}`);
    }
  
    console.log({ event });
    res.send({ received: true });
  };