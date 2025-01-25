"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { EventCardItemProps, getRandomImage } from "@/components/events-card";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { EventResponse, getAllEvents } from "@/api/eventApi";

interface Event {
  title: string;
  date: string;
  description: string;
}

const sampleEvent: Event = {
  title: "Hackathon",
  date: "Sun 09/22",
  description: "MASQUERAID 9:05AM - 12:35PM PDT ALLEGIANT STADIUM LOT B",
};

function UpcomingEvents() {
  const [events, setEvents] = useState<EventResponse[]>([]);
  const [randomThreeEvents, setRandomThreeEvents] = useState<EventResponse[]>(
    []
  );
  const [eventsLength, setEventsLength] = useState<number>(0);
  const [eventsLoading, setEventsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const allEvents = await getAllEvents();
      console.log("allEvents: ", allEvents);
      setEvents(allEvents);
      // Get the total count of events
      setEventsLength(allEvents.length);
      setEventsLoading(false);
    };
    fetchEvents();
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-[100px] ">
      {/*  Page Title*/}
      <div className="text-center space-y-8">
        <h1 className="text-4xl font-bold">Our Upcoming Events</h1>

        <p className="text-lg text-gray-400">
          Join our Waitlist and get access to Rumor for discounted early-bird
          prices.
        </p>
      </div>
      {/* Event Cards */}
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {events &&
            eventsLength >= 3 &&
            !eventsLoading &&
            events.slice(0, 3).map((event, index) => (
              <div key={index}>
                <EventCardItemForLanding item={event} />
              </div>
            ))}
        </div>
      </div>

      {/* View All Events Button */}
      <div className="text-center">
        <Link href="\events">
          <button className="bg-purple-600 hover:bg-purple-700 text-white border text-white font-medium py-3 px-6 rounded border border-[#9030CF] transition-colors">
            View All Events
          </button>
        </Link>
      </div>
    </div>
  );
}

function EventCardItemForLanding({ item }: EventCardItemProps) {
  const setTheImage = () => {
    if (item.imageUrl) {
      return item.imageUrl;
    } else {
      return getRandomImage();
    }
  };

  const [image] = useState<string>(setTheImage);

  const formatDate = (originalDate: Date): string => {
    const date = new Date(originalDate);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "2-digit",
      day: "2-digit",
      year: "2-digit",
    });
  };

  return (
    <Card className="flex w-[266px] h-[341px] very-sm:w-[355px] very-sm:h-[455px] p-3 flex-col gap-4 flex-[1_0_0] rounded-[5px] border-gray-600 bg-[#1a1d24]">
      {/* Top Image */}
      <CardHeader className="w-full h-[191px] very-sm:h-[225px] relative rounded-[5px] overflow-hidden">
        <Image src={image} alt="event-image" layout="fill" objectFit="cover" />
      </CardHeader>

      {/* Card Content */}
      <CardContent className="space-y-4 w-full p-0">
        <CardTitle className="text-xl font-semibold text-white">
          {item.title}
        </CardTitle>
        <p className="text-gray-400 text-lg">{formatDate(item.date)}</p>
        <p className="text-gray-400 text-lg">{item.content}</p>
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

export default UpcomingEvents;
