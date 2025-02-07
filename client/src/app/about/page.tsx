import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import React from "react";

function About() {
  const images = [
    "/assets/images/createEvents.jpg",
    "/assets/images/GrandPrize.png",
    "/assets/images/hackathon.png",
    "/assets/images/hackathon.png",
    "/assets/images/smartMirror.png",
    "/assets/images/blueScreenComputer.png",
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Carousel className="w-full max-w-xs lg:max-w-lg dark">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card className="border-none">
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <img
                      src={image}
                      alt={`Image ${index + 1}`}
                      className="object-contain h-full w-full"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="mt-8 max-w-md text-center">
        <p className="text-lg text-white">
          Welcome to our club! We are a community of passionate individuals who
          love to create, innovate, and collaborate on various projects. Join us
          to participate in exciting events, hackathons, and workshops. Let's
          build something amazing together!
        </p>
      </div>
    </div>
  );
}

export default About;
