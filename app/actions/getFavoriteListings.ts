import prisma from "@/lib/prismadb";
import { getCurrentUser } from "./getCurrentUser";

export default async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    let currentUserFavIdsArray = currentUser.favourite_ids?.split(",") || [];

    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUserFavIdsArray || [])],
        },
      },
    });

    const safeFavorites = favorites.map((favorite) => ({
      ...favorite,
      created_at: favorite.created_at.toString(),
    }));

    return safeFavorites;
  } catch (error: any) {
    throw new Error(error);
  }
}
