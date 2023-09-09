import { SafeUser } from "@/utils/types";
import React, { useState } from "react";
import { Input } from "./Input";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { Button } from "../Button";

interface UserInfoEditProps {
  title: string;
  subtitle: string | null | undefined;
  label: string;
  secondaryLabel: string;
  currentUser?: SafeUser | null;
  isLoading: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

export const UserInfoEdit: React.FC<UserInfoEditProps> = ({
  title,
  subtitle,
  label,
  secondaryLabel,
  currentUser,
  isLoading,
  register,
  errors,
}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
      <div className="flex justify-between items-center w-full">
        <h2
          className="text-base font-medium leading-7 text-gray-900"
          style={{ fontSize: "16px" }}
        >
          {title}
        </h2>
        <p
          className="font-medium underline cursor-pointer text-sm"
          onClick={() => setOpenModal(!openModal)}
        >
          {openModal ? "Cancel" : "Edit"}
        </p>
      </div>

      <p className="mt-0 text-sm leading-6 text-gray-600">
        {openModal ? secondaryLabel : subtitle}
      </p>

      {openModal && (
        <div className="mt-5" style={{ transform: "scale(1)" }}>
          <Input
            id={label}
            label={label}
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />

          <div style={{ width: "80px", marginTop: "1em" }}>
            <Button label="Save" onClick={() => {}} />
          </div>
        </div>
      )}
    </>
  );
};
