"use client";

import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { ImageHolder } from "@/components/account/ImageHolder";
import { UserInfo } from "@/components/account/UserInfo";
import { SafeUser } from "@/utils/types";
import React from "react";

interface AccountClientProps {
  currentUser: SafeUser | null;
}

export const AccountClient: React.FC<AccountClientProps> = ({
  currentUser,
}) => {
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
        <UserInfo currentUser={currentUser} />
        <ImageHolder currentUser={currentUser} onChange={() => {}} />
      </div>
    </Container>
  );
};
