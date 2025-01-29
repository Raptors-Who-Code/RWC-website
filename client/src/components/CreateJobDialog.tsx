import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

function CreateJobDialog() {
  return (
    <DialogContent className="sm:max-w-[425px] dark border-none">
      <DialogHeader>
        <DialogTitle className="font-extrabold text-4xl text-center">
          Create Job
        </DialogTitle>
        <DialogDescription>Make changes to create a job</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-lg font-medium text-gray-300">
            Title
          </Label>
          <Input
            id="name"
            value="Pedro Duarte"
            className="border border-gray-600 rounded-lg p-6 bg-neutral-800 text-white focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label
            htmlFor="username"
            className="text-lg font-medium text-gray-300"
          >
            Username
          </Label>
          <Input
            id="username"
            value="@peduarte"
            className="border border-gray-600 rounded-lg bg-neutral-800 text-white focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Create job</Button>
      </DialogFooter>
    </DialogContent>
  );
}
export default CreateJobDialog;
