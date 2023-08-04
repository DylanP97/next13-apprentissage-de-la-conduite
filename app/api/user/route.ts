// // pages/api/users.js
// import { connectToDatabase } from "../../../mongo";
// import prisma from "@prisma/client";

// export default async function handler(req: Request, res: Response) {
//   if (req.method === "GET") {
//     const db = await connectToDatabase();
//     const users = await prisma.user.findMany();



//     res.status(200).json(users);
//   } else {
//     res.status(405).json({ message: "Method Not Allowed" });
//   }
// }
