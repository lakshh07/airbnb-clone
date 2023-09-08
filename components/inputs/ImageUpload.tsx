import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import { BiTrash } from "react-icons/bi";

declare global {
  var cloudinary: any;
}

const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESENT;

interface ImageUploadProps {
  onChange: (value: string) => void;
  value?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    async (result: any) => {
      let valueArray = value?.split(",");
      valueArray?.push(result.info.secure_url);

      if (!valueArray) {
        return;
      }

      if (valueArray[0].length === 0) {
        valueArray?.shift();
      }

      onChange(valueArray.toString());
    },
    [onChange, value]
  );

  const onRemove = (imgUrl: string) => {
    const updatedArray = value?.split(",").filter((currentImgUrl) => {
      return currentImgUrl != imgUrl;
    });
    if (updatedArray) {
      return updatedArray.toString();
    } else {
      return " ";
    }
  };

  return (
    <>
      <div className="mb-4 flex items-center gap-4">
        <div
          className={`
            grid 
            ${value && value.split(",").length ? "grid-cols-2" : "grid-cols-1"} 
            gap-6 
            mx-auto
          `}
        >
          {value &&
            value.split(",").map((img, index) => {
              return (
                <div
                  key={index}
                  className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
                >
                  <div
                    className="z-10 bg-red-500 p-1 rounded-md absolute top-2 right-2 cursor-pointer"
                    onClick={() => {
                      onChange(onRemove(img));
                    }}
                  >
                    <BiTrash className="h-4 w-4" color="#f5f5f5" />
                  </div>
                  <Image fill className="object-cover" alt="Image" src={img} />
                </div>
              );
            })}

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
                  className={`
                      relative
                      w-[200px] 
                      h-[200px]
                      rounded-md
                      cursor-pointer
                      hover:opacity-70
                      transition
                      border-dashed 
                      border-2 
                      p-5 
                      border-neutral-300
                      ${value?.split(",").length === 4 ? "hidden" : "flex"}
                      flex-col
                      justify-center
                      items-center
                      gap-2
                      text-neutral-600
                    `}
                >
                  <TbPhotoPlus size={25} />
                  <div className="font-semibold text-md text-center">
                    Click to upload (upto 4)
                  </div>
                </div>
              );
            }}
          </CldUploadWidget>
        </div>
      </div>
    </>
  );
};

export default ImageUpload;
