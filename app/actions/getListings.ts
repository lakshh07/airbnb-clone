import prisma from "@/lib/prismadb";

export interface IListingParams {
  userId?: string;
  roomCount?: string;
  bathroomCount?: string;
  guestCount?: string;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function getListings(params: IListingParams) {
  try {
    const {
      userId,
      guestCount,
      roomCount,
      bathroomCount,
      startDate,
      endDate,
      locationValue,
      category,
    } = params;

    const query: any = {};

    if (userId) {
      query.user_id = userId;
    }

    if (category) {
      query.category = category;
    }

    if (roomCount) {
      query.room_count = {
        gte: +roomCount,
      };
    }

    if (guestCount) {
      query.guest_count = {
        gte: +guestCount,
      };
    }

    if (bathroomCount) {
      query.bathroom_count = {
        gte: +bathroomCount,
      };
    }

    if (locationValue) {
      query.location_value = locationValue;
    }

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                end_date: { gte: startDate },
                start_date: { lte: startDate },
              },
              {
                start_date: { lte: endDate },
                end_date: { gte: endDate },
              },
            ],
          },
        },
      };
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        created_at: "desc",
      },
    });

    const safeListing = listings.map((listing) => ({
      ...listing,
      created_at: listing.created_at.toISOString(),
    }));

    return safeListing;
  } catch (error: any) {
    throw new Error(error);
  }
}
