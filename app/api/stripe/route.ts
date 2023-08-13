import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const storeItems = new Map([
  [
    1,
    {
      priceInCents: 999,
      name: "Abonnement d'un mois",
      productId: "price_1Ndz5RFgJQlKBjkeNon42oIX",
    },
  ],
  [
    2,
    {
      priceInCents: 2499,
      name: "Abonnement de trois mois",
      productId: "price_1NdzC3FgJQlKBjken3i8X4l2",
    },
  ],
  [
    3,
    {
      priceInCents: 3999,
      name: "Abonnement de six mois",
      productId: "price_1NdzC3FgJQlKBjkeyMPBTlHq",
    },
  ],
]);

const handleCheckoutSessionCompleted = async (session: { id: any; metadata: { plan_id: any; id: any; }; }) => {
  console.log("Checkout session completed:", session.id);
  
  const planId = session.metadata.plan_id;
  await prisma.user.update({
    where: {
      id: session.metadata.id,
    },
    data: {
      isSubscribed: true,
      subscriptionPlan: planId,
    },
  });
  
  console.log("User subscription updated:", session.metadata.id);
};


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, userId } = body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: items.map((item: { id: number; quantity: any }) => {
        console.log(items)
        const storeItem = storeItems.get(item.id);
        return {
          price: storeItem?.productId,
          quantity: item.quantity,
        };
      }),
      success_url: `http://localhost:3000/`,
      cancel_url: `http://localhost:3000/`,
      metadata: {
        plan_id: items[0].id,
        id: userId,
      },
    });

    // stripe.on("checkout.session.completed", async (session: any) => {
    //   console.log("welcome to he");
    //   const planId = session.metadata.plan_id;
    //   await prisma.user.update({
    //     where: {
    //       id: session.metadata.id,
    //     },
    //     data: {
    //       isSubscribed: true,
    //       subscriptionPlan: planId,
    //     },
    //   });
    //   console.log("User subscription updated:", session.metadata.id);
    // });

    return NextResponse.json({ message: session.url, status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ message: error.message, status: 500 });
  }
}


export async function handleStripeWebhook(request: Request) {
  const payload = await request.text();
  const sig = request.headers.get("Stripe-Signature");

  try {
    const event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET);

    if (event.type === "checkout.session.completed") {
      await handleCheckoutSessionCompleted(event.data.object);
    }

    return NextResponse.json({ message: "greeat" });
  } catch (err: any) {
    console.error("Webhook error:", err.message);
    return NextResponse.json({ message: err.message });
  }
}