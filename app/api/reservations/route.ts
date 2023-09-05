import { NextResponse } from "next/server";

import prisma from "@/lib/prismadb";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { listing_id, start_date, end_date, total_price } = body;

  if (!listing_id || !start_date || !end_date || !total_price) {
    return NextResponse.error();
  }

  const listingAndReservation = await prisma.listing.update({
    where: {
      id: listing_id,
    },
    data: {
      reservations: {
        create: {
          user_id: currentUser.id,
          start_date,
          end_date,
          total_price,
        },
      },
    },
  });

  return NextResponse.json(listingAndReservation);
}
