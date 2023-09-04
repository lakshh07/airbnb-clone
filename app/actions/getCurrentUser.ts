import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/lib/prismadb";

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    return {
      ...currentUser,
      created_at: currentUser.created_at.toISOString(),
      updated_at: currentUser.updated_at.toISOString(),
      email_verified: currentUser.email_verified?.toISOString() || null,
    };
  } catch (error: any) {
    return null;
  }
}
