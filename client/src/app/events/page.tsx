"use client";

import React, { useEffect, useState } from "react";
import EventCardList from "@/components/event-card-list";
import EventPagination from "@/components/event-pagination";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EventResponse } from "@/api/eventApi";
import { getAllEvents } from "@/api/eventApi";
import useAuth from "@/hooks/useAuth";

type Props = {
  searchParams: {
    page?: string;
    pageSize?: string;
  };
};

export default function Events({ searchParams }: Props) {
  const { data: user, isLoading: authLoading } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [allEvents, setAllEvents] = useState<EventResponse[]>([]);
  const [count, setCount] = useState<number>(0);
  const page = parseInt(searchParams.page || "1", 10);
  const pageSize = parseInt(searchParams.pageSize || "6", 10);

  // Fetch all events from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      const allEvents = await getAllEvents();
      // Calculate the start and end indices for the current page
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      // Slice the events array to get the current page's events
      setAllEvents(allEvents.slice(start, end));
      // Get the total count of events
      setCount(allEvents.length);
      setLoading(false);
    };

    fetchEvents();
  }, [page, pageSize]);

  if (authLoading || loading) {
    //#TODO: Add a sepearate loading page
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-20">
      <div className="max-w-6xl mx-auto space-y-12">
        {/*  Page Title */}
        <div className="text-center space-y-8">
          <h1 className="text-4xl font-bold">Our Upcoming Events</h1>
          <p className="text-lg text-gray-400">
            Join our Waitlist and get access to Rumor for discounted early-bird
            prices.
          </p>
        </div>
        {user && (
          <div className="text-center">
            <Link href="/events/create">
              <Button className="rounded-none">Create Event</Button>
            </Link>
          </div>
        )}

        {/* Events */}
        <EventCardList data={allEvents} />

        <EventPagination
          page={page}
          pageSize={pageSize}
          totalCount={count}
          pageSizeSelectOptions={{ pageSizeOptions: [6, 12, 24, 48] }}
        />
      </div>
    </div>
  );
}
