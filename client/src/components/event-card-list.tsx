import { EventCardItem } from "@/components/events-card";

interface Event {
    title: string;
    date: string;
    description: string;
  }
  
  interface EventCardItemProps {
    data: Event[];
  }

  export default function EventCardList({ data }: EventCardItemProps) {
      return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {data.map((item, index) => (
                  <EventCardItem key={index} item={item} />
              ))}
          </div>
      );
  }