"use client";

import { useRegisterModal } from "@/hooks/useRegisterModal";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Modal } from "./Modal";
import { Heading } from "../Heading";
import { Input } from "../inputs/Input";
import toast from "react-hot-toast";
import { Button } from "../Button";
import { signIn } from "next-auth/react";
import { useLoginModal } from "@/hooks/useLoginModal";

export const RegisterModal: React.FC = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Success!");
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch((error) => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account!" />
      <Input
        id="email"
        label="Email"
        type="email"
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        type="text"
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        type="password"
        label="Password"
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="justify-center flex flex-row items-center gap-2">
          <div>Already have an account?</div>
          <div
            className="text-neutral-800 cursor-pointer hover:underline"
            onClick={onToggle}
          >
            Log In
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Modal
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        onClose={registerModal.onClose}
        title="Register"
        body={bodyContent}
        footer={footerContent}
        actionLabel="Continue"
        onSubmit={handleSubmit(onSubmit)}
      />
    </>
  );
};
