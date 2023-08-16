import React, { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { Avatar } from "../Avatar";
import { MenuItem } from "./MenuItem";
import { useRegisterModal } from "@/hooks/useRegisterModal";
import { useLoginModal } from "@/hooks/useLoginModal";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

interface UserMenuProps {
  currentUser?: User | null;
}

export const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const router = useRouter();
  const loginModal = useLoginModal();
  const [isOpen, setIsOpen] = useState<boolean>();

  const menu = [
    {
      title: "My trips",
      url: () => {
        router.push("/trips");
      },
    },
    {
      title: "My favorites",
      url: () => {
        router.push("/favorites");
      },
    },
    {
      title: "My reservations",
      url: () => {
        router.push("/reservations");
      },
    },
    {
      title: "My properties",
      url: () => {
        router.push("/properties");
      },
    },
    {
      title: "Airbnb your home",
      url: () => {
        router.push("/trips");
      },
    },
    {
      title: "Logout",
      url: () => signOut(),
    },
  ];

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => {}}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition-all cursor-pointer"
        >
          Airbnb your home
        </div>

        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 flex flex-row items-center gap-3 border-[1px] border-neutral-200 rounded-full cursor-pointer hover:shadow-md transition-all"
        >
          <AiOutlineMenu />

          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                {menu?.slice(0, -1).map((list, index) => {
                  return (
                    <MenuItem
                      label={list.title}
                      onClick={list.url}
                      key={index}
                    />
                  );
                })}
                <hr />
                <MenuItem
                  label={menu[menu.length - 1].title}
                  onClick={menu[menu.length - 1].url}
                />
              </>
            ) : (
              <>
                <MenuItem label="Login" onClick={loginModal.onOpen} />
                <MenuItem label="Sign Up" onClick={registerModal.onOpen} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
