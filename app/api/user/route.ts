import prisma from "@/lib/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

// // export async function getCurrentUser() {
// //   const currentUser = await prisma.user.findMany();

// //   console.log(currentUser);

// //   return currentUser;
// // }
import { NextResponse } from "next/server";

export async function GET(request: NextApiRequest) {
  // const currentUser = await prisma.user.findMany();
  const currentUser = await prisma.user.findUnique({
    where: {
      email: "lucky@gmail.com",
    },
  });
  console.log(currentUser);
  return NextResponse.json({ message: currentUser });
}
