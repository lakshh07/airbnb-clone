import { User } from "@prisma/client";

export type SafeUser = Omit<
  User,
  "created_at" | "updated_at" | "email_verified"
> & {
  created_at: string;
  updated_at: string;
  email_verified: string;
};
