"use client";

import useCountries from "@/hooks/useCountries";
import { SafeUser } from "@/utils/types";
import Image from "next/image";
import { Heading } from "../Heading";
import HeartButton from "../HeartButton";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";

interface ListingHeadProps {
  title: string;
  locationValue: string;
  imageSrc: string[];
  id: string;
  currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  locationValue,
  imageSrc,
  id,
  currentUser,
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);
  const AutoplaySlider = withAutoplay(AwesomeSlider);

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div
        className="
          w-full
          h-[60vh] justify-center items-center overflow-hidden
          rounded-xl
          relative
        "
      >
        <AutoplaySlider
          className={"aws-btn"}
          play={true}
          cancelOnInteraction={false} // should stop playing on user interaction
          interval={2000}
          bullets={false}
          organic-arrow-height={"24px"}
          buttons={imageSrc.length > 1 && true}
          organic-arrow-thickness={"2px"}
          organic-arrow-color={"#ffffff"}
          control-button-height={"80% "}
        >
          {imageSrc.map((img, index) => {
            return (
              <div key={index}>
                <Image
                  src={img}
                  fill
                  className="object-cover w-full"
                  alt="Image"
                />
              </div>
            );
          })}
        </AutoplaySlider>
        <div
          className="
            absolute
            top-5
            right-5 z-20
          "
        >
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
