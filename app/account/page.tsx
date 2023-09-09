import EmptyState from "@/components/EmptyState";
import { getCurrentUser } from "../actions/getCurrentUser";
import { AccountClient } from "./AccountClient";

const AccountPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  return <AccountClient currentUser={currentUser} />;
};

export default AccountPage;
