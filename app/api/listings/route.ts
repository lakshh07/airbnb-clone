import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    title,
    description,
    image_url,
    category,
    room_count,
    bathroom_count,
    guest_count,
    location_value,
    price,
  } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      image_url,
      category,
      room_count,
      bathroom_count,
      guest_count,
      location_value: location_value.value,
      price: parseInt(price, 10),
      user_id: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
