import prisma from "@/lib/prismadb";

export default async function getListings() {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: {
        created_at: "desc",
      },
    });

    return listings;
  } catch (error: any) {
    throw new Error(error);
  }
}
