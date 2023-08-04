import Image from "next/image";
import React from "react";

export const Avatar: React.FC = () => {
  return (
    <Image
      className="rounded-full"
      height="30"
      width="30"
      alt="avatar"
      src="/images/placeholder.png"
    />
  );
};
