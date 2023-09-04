import prisma from "@/lib/prismadb";

export default async function getListings() {
  try {
    const listings = await prisma.listing.findMany({
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
