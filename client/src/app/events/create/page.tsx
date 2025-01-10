"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function CreateEvent() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  return (
    <div className="dark flex items-center justify-center h-[100%] overflow-hidden">
      <form className="space-y-6">
        <h1 className="font-extrabold text-4xl text-center tracking-wide">
          Create Event
        </h1>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            placeholder="Enter event title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="description">Description</Label>
          <Input
            type="text"
            id="description"
            placeholder="Provide a brief description of the event"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="image">Image</Label>
          <Input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
        </div>
        <div className="flex flex-col w-full max-w-sm items-center gap-1.5 lg:items-start">
          <Label htmlFor="date">Date</Label>
          <Calendar
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
          />
        </div>
        <Button type="submit">Create Event</Button>
      </form>
    </div>
  );
}

export default CreateEvent;
