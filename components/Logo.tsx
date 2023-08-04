import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export const Logo: React.FC = () => {
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push("/")}
      alt="logo"
      className="hidden md:block cursor-pointer"
      height="100"
      width="100"
      src="/images/logo.png"
    />
  );
};
