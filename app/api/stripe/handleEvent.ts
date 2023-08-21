import prisma from "@/app/libs/prismadb";

const handleEvent = async (session: any, planId: any) => {
  await prisma.user.update({
    where: {
      id: session.metadata.id,
    },
    data: {
      isSubscribed: true,
      subscriptionPlan: planId,
    },
  });
};

export default handleEvent;
