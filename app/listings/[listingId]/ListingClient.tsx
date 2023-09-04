"use client";

import { Container } from "@/components/Container";
import ListingHead from "@/components/listings/ListingHead";
import ListingInfo from "@/components/listings/ListingInfo";
import { categories } from "@/components/navbar/Categories";
import { SafeListing, SafeUser } from "@/utils/types";
import { Reservation } from "@prisma/client";
import React, { useMemo } from "react";

interface ListingClientProps {
  reservation?: Reservation[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

export const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  currentUser,
}) => {
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  return (
    <Container>
      <div
        className="
            max-w-screen-lg 
            mx-auto
        "
      >
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.image_url}
            locationValue={listing.location_value}
            id={listing.id}
            currentUser={currentUser}
          />

          <div
            className="
                grid 
                grid-cols-1 
                md:grid-cols-7 
                md:gap-10 
                mt-6
            "
          >
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.room_count}
              guestCount={listing.guest_count}
              bathroomCount={listing.bathroom_count}
              locationValue={listing.location_value}
            />
            <div
              className="
                order-first 
                mb-10 
                md:order-last 
                md:col-span-3
            "
            >
              {/* <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
