"use client";

import useRentModal from "@/hooks/useRentModal";
import React, { useMemo, useState } from "react";
import { Modal } from "./Modal";
import { Heading } from "../Heading";
import { categories } from "../navbar/Categories";
import { CategoryInput } from "../inputs/CategoryInput";
import { FieldValues, useForm } from "react-hook-form";
import { CountrySelect } from "../inputs/CountrySelect";
import { Counter } from "../inputs/Counter";
import dynamic from "next/dynamic";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DISCRIPTION = 4,
  PRICE = 5,
}

export const RentModal: React.FC = () => {
  const rentModal = useRentModal();

  const [step, setStep] = useState<number>(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location_value: null,
      guest_count: 1,
      room_count: 1,
      bathroom_count: 1,
      image_url: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location_value");
  const guestCount = watch("guest_count");
  const roomCount = watch("room_count");
  const bathroomCount = watch("bathroom_count");

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((list, index) => {
          return (
            <div key={index} className="col-span-1">
              <CategoryInput
                onClick={(category) => {
                  setCustomValue("category", category);
                }}
                selected={category === list.label}
                label={list.label}
                icon={list.icon}
              />
            </div>
          );
        })}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />

        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location_value", value)}
        />

        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenities do you have?"
        />

        <Counter
          title="Guests"
          subtitle="How many guests do you allow?"
          value={guestCount}
          onChange={(value) => setCustomValue("guest_count", value)}
        />

        <hr />

        <Counter
          title="Rooms"
          subtitle="How many rooms do you allow?"
          value={roomCount}
          onChange={(value) => setCustomValue("room_count", value)}
        />

        <hr />

        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
          value={bathroomCount}
          onChange={(value) => setCustomValue("bathroom_count", value)}
        />
      </div>
    );
  }

  // if (step === STEPS.IMAGES) {
  //   bodyContent = (
  //     <div className="flex flex-col gap-8">
  //       <Heading
  //         title="Where is your place located?"
  //         subtitle="Help guests find you!"
  //       />
  //     </div>
  //   );
  // }

  // if (step === STEPS.DISCRIPTION) {
  //   bodyContent = (
  //     <div className="flex flex-col gap-8">
  //       <Heading
  //         title="Where is your place located?"
  //         subtitle="Help guests find you!"
  //       />
  //     </div>
  //   );
  // }

  // if (step === STEPS.PRICE) {
  //   bodyContent = (
  //     <div className="flex flex-col gap-8">
  //       <Heading
  //         title="Where is your place located?"
  //         subtitle="Help guests find you!"
  //       />
  //     </div>
  //   );
  // }

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={onNext}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      title="Airbnb your home!"
      body={bodyContent}
    />
  );
};
