import prisma from "@/lib/prismadb";

export interface IListingParams {
  userId?: string;
}

export default async function getListings(params: IListingParams) {
  try {
    const { userId } = params;

    const query: any = {};

    if (userId) {
      query.user_id = userId;
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
