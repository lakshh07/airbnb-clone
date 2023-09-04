import prisma from "@/lib/prismadb";

interface IParams {
  listingId?: string;
}

export default async function getListingById(params: IParams) {
  try {
    const { listingId } = params;

    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });

    if (!listing) {
      return null;
    }

    return {
      ...listing,
      created_at: listing.created_at.toISOString(),
      user: {
        ...listing.user,
        created_at: listing.user.created_at.toISOString(),
        updated_at: listing.user.updated_at.toISOString(),
        email_verified: listing.user.email_verified?.toISOString() || null,
      },
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
