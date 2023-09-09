"use client";

import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { ImageHolder } from "@/components/inputs/ImageHolder";
import { UserInfoEdit } from "@/components/inputs/UserInfoEdit";
import { SafeUser } from "@/utils/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface AccountClientProps {
  currentUser: SafeUser | null;
}

export const AccountClient: React.FC<AccountClientProps> = ({
  currentUser,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      email: currentUser?.email,
      image: currentUser?.image,
    },
  });

  const userName = watch("name");
  const userEmail = watch("email");
  const userImage = watch("image");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/account", data)
      .then(() => {
        toast.success("Account updated!");
        setTimeout(() => {
          router.refresh();
          reset();
        }, 1000);
      })
      .catch(() => {
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Container>
      <Heading
        title="Account"
        subtitle={`This information will be displayed publicly so be careful what you share.`}
      />

      <div
        className="flex pt-20"
        style={{ width: "80%", justifyContent: "space-between" }}
      >
        <div
          style={{
            width: "60%",
          }}
        >
          <UserInfoEdit
            title="Legal Name"
            subtitle={userName}
            label="name"
            secondaryLabel="This is the name on your travel document, which could be a licence or a passport."
            isLoading={isLoading}
            register={register}
            errors={errors}
            onSubmit={handleSubmit(onSubmit)}
          />
          <hr className="my-8" />

          <UserInfoEdit
            title="Email address"
            subtitle={userEmail}
            label="email"
            secondaryLabel="Use an address you'll always have access to."
            isLoading={isLoading}
            register={register}
            errors={errors}
            onSubmit={handleSubmit(onSubmit)}
          />
          <hr className="my-8" />
        </div>

        <ImageHolder
          userImage={currentUser?.image}
          value={userImage}
          onChange={(value) => {
            setCustomValue("image", value);
          }}
          onSubmit={handleSubmit(onSubmit)}
        />
      </div>
    </Container>
  );
};
