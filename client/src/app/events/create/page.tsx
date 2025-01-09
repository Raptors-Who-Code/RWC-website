import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function CreateEvent() {
  return (
    <div className="dark flex items-center justify-center h-[100%] overflow-hidden">
      <h1 className="font-extrabold text-4xl text-center tracking-wide">
        Create Event
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="title">Title</Label>
          <Input type="text" id="title" placeholder="Enter event title" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="description">Description</Label>
          <Input
            type="text"
            id="description"
            placeholder="Provide a brief description of the event"
          />
        </div>
        <div>
          <Calendar></Calendar>
        </div>
      </h1>
    </div>
  );
}
export default CreateEvent;
