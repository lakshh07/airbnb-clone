import EmptyState from "@/components/EmptyState";
import { getCurrentUser } from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import { TripsClient } from "./TripsClient";

export default async function TripsPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please Login" />;
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No trips found"
        subtitle="Looks like you have not reserved any trips."
      />
    );
  }

  return <TripsClient currentUser={currentUser} reservations={reservations} />;
}
