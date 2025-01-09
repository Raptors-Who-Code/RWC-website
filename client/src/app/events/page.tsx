import React from "react";
import EventCardList from "@/components/event-card-list";
import EventPagination from "@/components/event-pagination";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  searchParams: {
    page?: string;
    pageSize?: string;
  };
};

interface Event {
  title: string;
  date: string;
  description: string;
}

export default async function Events({ searchParams }: Props) {
  const page = parseInt(searchParams.page || "1", 10);
  const pageSize = parseInt(searchParams.pageSize || "6", 10);

  const [data, count] = await getEventsWithCount(page, pageSize);

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
        <div className="text-center">
          <Link href="/events/create">
            <Button className="rounded-none">Create Event</Button>
          </Link>
        </div>

        {/* Events */}
        <EventCardList data={data} />

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
async function getEventsWithCount(
  page: number,
  pageSize: number
): Promise<[Event[], number]> {
  const allEvents = Array(500)
    .fill({
      title: "Hackathon",
      date: "Sun 09/22",
      description: "MASQUERAID 9:05AM - 12:35PM PDT ALLEGIANT STADIUM LOT B",
    })
    .map((event, index) => ({
      ...event,
      id: index + 1,
      title: `${event.title} #${index + 1}`,
    }));

  // Slice the allEvents array to get the current page's events
  const start = (page - 1) * pageSize;
  const data = allEvents.slice(start, start + pageSize);

  return [data, allEvents.length];
}
