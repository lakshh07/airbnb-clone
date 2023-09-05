import prisma from "@/lib/prismadb";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(params: IParams) {
  try {
    const { listingId, userId, authorId } = params;

    const query: any = {};

    if (listingId) {
      query.listing_id = listingId;
    }
    if (userId) {
      query.user_id = userId;
    }
    if (authorId) {
      query.author_id = { user_id: authorId };
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      created_at: reservation.created_at.toISOString(),
      start_date: reservation.start_date.toISOString(),
      end_date: reservation.end_date.toISOString(),
      listing: {
        ...reservation.listing,
        created_at: reservation.listing.created_at.toISOString(),
      },
    }));

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
