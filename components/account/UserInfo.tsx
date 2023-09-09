import { SafeUser } from "@/utils/types";
import React, { useState } from "react";
import { UserInfoEdit } from "../inputs/UserInfoEdit";
import { FieldValues, useForm } from "react-hook-form";

interface UserInfoProps {
  currentUser: SafeUser | null;
}

export const UserInfo: React.FC<UserInfoProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {},
  });

  return (
    <div
      style={{
        width: "60%",
      }}
    >
      <UserInfoEdit
        title="Legal Name"
        subtitle={currentUser?.name}
        label="name"
        secondaryLabel="This is the name on your travel document, which could be a licence or a passport."
        currentUser={currentUser}
        isLoading={isLoading}
        register={register}
        errors={errors}
      />
      <hr className="my-8" />

      <UserInfoEdit
        title="Email address"
        subtitle={currentUser?.email}
        label="email"
        secondaryLabel="Use an address you'll always have access to."
        currentUser={currentUser}
        isLoading={isLoading}
        register={register}
        errors={errors}
      />
      <hr className="my-8" />
    </div>
  );
};
