import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";

interface ImageHolderProps {
  userImage: string | null | undefined;
  value?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESENT;

export const ImageHolder: React.FC<ImageHolderProps> = ({
  disabled,
  value,
  userImage,
  onChange,
  onSubmit,
}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [onSubmit, disabled]);

  const ogImg = userImage || "/images/placeholder.png";

  return (
    <div className="flex-initial">
      <Image
        src={value || ogImg}
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
              onClick={() => {
                open?.();
                setOpenModal(!openModal);
              }}
              className="flex justify-center align-center pt-4"
            >
              <p className="font-semibold underline cursor-pointer">Edit</p>
            </div>
          );
        }}
      </CldUploadWidget>

      {openModal && (
        <div className="flex gap-5 pt-7 justify-center">
          <div
            onClick={handleSubmit}
            className="p-1 rounded-full bg-green-400 flex justify-center cursor-pointer"
          >
            <TiTick color={"white"} />
          </div>
          <div
            onClick={() => {
              onChange(ogImg);
              setOpenModal(!openModal);
            }}
            className="p-1 rounded-full bg-red-400 flex justify-center cursor-pointer"
          >
            <RxCross2 strokeWidth="1.3px" color={"white"} />
          </div>
        </div>
      )}
    </div>
  );
};
