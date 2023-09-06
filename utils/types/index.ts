import { Listing, Reservation, User } from "@prisma/client";

export type SafeListing = Omit<Listing, "created_at"> & {
  created_at: string;
};

export type SafeReservation = Omit<
  Reservation,
  "created_at" | "start_date" | "end_date" | "listing"
> & {
  created_at: string;
  start_date: string;
  end_date: string;
  listing: SafeListing;
};

export type SafeUser = Omit<
  User,
  "created_at" | "updated_at" | "email_verified"
> & {
  created_at: string;
  updated_at: string;
  emailVerified: string | null;
};
