"use client";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "./ui/card";
import { useEffect, useState } from "react";

import { Button } from "./ui/button";

interface Event {
  title: string;
  date: string;
  description: string;
}

interface EventCardItemProps {
  item: Event;
}

const imagesArray = [
  "/assets/images/computers.png",
  "/assets/images/maze.png",
  "/assets/images/events-background.png",
];

export const getRandomImage = (): string => {
  const randomIndex = Math.floor(Math.random() * imagesArray.length);
  const randomImage = imagesArray[randomIndex];
  return randomImage;
};

export function EventCardItem({ item }: EventCardItemProps) {
  const [randomImage, setRandomImage] = useState<string>("");

  useEffect(() => {
    setRandomImage(getRandomImage());
  }, []);

  return (
    <Card className="flex w-[355px] h-[455px] p-3 flex-col gap-4 flex-[1_0_0] rounded-[5px] border-gray-600 bg-[#1a1d24]">
      {/* Top Image */}
      <CardHeader className=" w-full h-[225px] relative rounded-[5px] overflow-hidden">
        <Image
          src={randomImage}
          alt="event-image"
          layout="fill"
          objectFit="cover"
        />
      </CardHeader>

      {/* Card Content */}
      <CardContent className="space-y-4 w-full p-0">
        <CardTitle className="text-xl font-semibold text-white">
          {item.title}
        </CardTitle>
        <p className="text-gray-400 text-lg">{item.date}</p>
        <p className="text-gray-400 text-lg">{item.description}</p>
      </CardContent>

      <CardFooter className="p-1 pt-5">
        <Button
          className="w-full bg-transparent hover:bg-purple-500 text-white border border-purple-500 rounded-[4px] py-5 text-md font-medium transition-colors duration-200"
          variant="outline"
        >
          Register Now
        </Button>
      </CardFooter>
    </Card>
  );
}
export default EventCardItem;
