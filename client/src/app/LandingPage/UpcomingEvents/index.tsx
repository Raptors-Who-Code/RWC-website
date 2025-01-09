import React from "react";
import Link from "next/link";
import EventCard from "@/components/events-card";
import { Button } from "@/components/ui/button";

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        <div className="">
          <EventCard item={sampleEvent} />
        </div>
        <div className="">
          <EventCard item={sampleEvent} />
        </div>
        <div className="">
          <EventCard item={sampleEvent} />
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

export default UpcomingEvents;
