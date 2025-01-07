"use client";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "./ui/card";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const imagesArray = [
  "/assets/images/computers.png",
  "/assets/images/maze.png",
  "/assets/images/events-background.png",
];

const getRandomImage = (): string => {
  const randomIndex = Math.floor(Math.random() * imagesArray.length);
  const randomImage = imagesArray[randomIndex];
  return randomImage;
};

function EventCard() {
  const [randomImage, setRandomImage] = useState<string>("");

  useEffect(() => {
    setRandomImage(getRandomImage());
  }, []);

  return (
    <Card className="flex w-[355px] h-[455px] p-3 flex-col justify-center items-center gap-4 flex-[1_0_0] rounded border border-[rgba(255,255,255,0.26)] bg-[rgba(255,255,255,0.06)]">
      <CardHeader className="w-full h-[240px] relative">

        <Image
          src={randomImage}
          alt="event-image"
          layout="fill"
          objectFit="cover"
        />
      </CardHeader>

      <CardContent className="flex flex-col gap-8 ">
        <div className="flex flex-col gap-2 ">
          <h1 className="self-stretch text-white font-['Plus_Jakarta_Sans'] text-[20px] font-bold leading-normal">
            Event Name
          </h1>
          <h1 className="self-stretch text-[#E4E1E1] font-['Plus_Jakarta_Sans'] text-[18px] font-normal leading-[26px]">
            Sun 09/22/24
          </h1>
          <h1 className="w-[287.045px] text-[#E4E1E1] font-['Plus_Jakarta_Sans'] text-[18px] font-normal leading-[26px]">
            Card Description Lorem ipsum dolor sit, amet consectetur adipisicin
          </h1>
        </div>

        <div>
        <Button className="flex p-[13px_24px] justify-center items-center gap-[10px] flex-[1_0_0] self-stretch rounded border border-[#9030CF]">
            Join
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
export default EventCard;
