import { SafeUser } from "@/utils/types";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import React, { useCallback } from "react";
import { RxCross2 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";

interface ImageHolderProps {
  currentUser: SafeUser | null;
  onChange: (value: string) => void;
  value?: string;
}

const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESENT;

export const ImageHolder: React.FC<ImageHolderProps> = ({
  currentUser,
  onChange,
  value,
}) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <div className="flex-initial">
      <Image
        src={currentUser?.image || value || "/images/placeholder.png"}
        className="rounded-full"
        height="300"
        width="300"
        alt="avatar"
      />

      <CldUploadWidget
        onUpload={handleUpload}
        uploadPreset={uploadPreset}
        options={{
          maxFiles: 1,
        }}
      >
        {({ open }) => {
          return (
            <div
              onClick={() => open?.()}
              className="flex justify-center align-center pt-4"
            >
              <p className="font-semibold underline cursor-pointer">Edit</p>
            </div>
          );
        }}
      </CldUploadWidget>

      <div className="flex gap-5 pt-7 justify-center">
        <div className="p-1 rounded-full bg-green-400 flex justify-center cursor-pointer">
          <TiTick color={"white"} />
        </div>
        <div className="p-1 rounded-full bg-red-400 flex justify-center cursor-pointer">
          <RxCross2 strokeWidth="1.3px" color={"white"} />
        </div>
      </div>
    </div>
  );
};
