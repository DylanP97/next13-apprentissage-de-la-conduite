import prisma from "@/app/libs/prismadb";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

interface IParams {
  userId?: string;
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  try {
    const { userId } = params;
    const body = await request.json();
    const { data } = body;

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: data,
    });

    if (!user) {
      return null;
    }

    return NextResponse.json({
      message: "User successfully updated",
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, status: 500 });
  }
}

// exports.updateUser = async (req, res) => {
//     const { email, firstName } = req.body;

//     if (!ObjectID.isValid(req.params.id))
//       return res.status(400).send("ID unknown : " + req.params.id);

//     const userObject = req.file
//       ? {
//           ...req.body,
//           imageUrl: req.body.imageUrl ? req.body.imageUrl : "",
//         }
//       : { ...req.body };

//     if (req.body.isAccepted == "true") {
//       const mail4 = mailValidAccepted(email, firstName);

//       await transporter.sendMail(mail4, function (error, info) {
//         if (error) {
//           console.log(error);
//         } else {
//           console.log("Email sent");
//         }
//       });
//     }

//     UserModel.findOneAndUpdate(
//       { _id: req.params.id },
//       { ...userObject },
//     )
//       .then((data) => res.send(data + "L'utilisateur a bien été modifié"))
//       .catch((err) => res.status(500).send({ message: err }));
//   };
