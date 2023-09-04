import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const currentUser = await prisma.listing.findMany();

  return NextResponse.json({ message: currentUser });
}
