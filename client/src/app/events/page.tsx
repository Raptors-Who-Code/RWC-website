import React from "react";
import EventCard from "@/components/events-card";

function Events() {
  return (
    <div className="flex p-[100px_80px] flex-col justify-center items-center self-stretch gap-12">
      <div className="flex flex-col gap-6">
        <h1 className="text-white text-center text-4xl font-bold leading-normal tracking-[-1.2px] self-stretch">
          Our Upcoming Events
        </h1>
        <p>Create an account to share all upcoming events in your area!</p>
      </div>
      <div className="">
        <EventCard />
      </div>
    </div>
  );
}

export default Events;
