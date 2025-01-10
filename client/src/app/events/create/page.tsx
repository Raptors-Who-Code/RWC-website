"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MdError } from "react-icons/md";
import Link from "next/link";
import { useAppSelector } from "@/app/redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation } from "@tanstack/react-query";
import { logUserOut } from "@/api/authApi";
import queryClient from "@/config/queryClient";
import { logout, User } from "@/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { Textarea } from "@/components/ui/textarea";

function CreateEvent() {
  const [title, setTitle] = useState<string>("");

  const dispatch = useDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);

  const { mutate: signOut } = useMutation({
    mutationFn: logUserOut,
    onSettled: () => {
      queryClient.clear();
      dispatch(logout());
      router.replace("/");
    },
  });

  const handleLogoutClick = () => {
    signOut();
  };

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const avatarFallBack: string | undefined = (
    user as User
  )?.name[0].toUpperCase();

  return (
    <div className="flex h-screen">
      {/* Left Side */}
      <div className="w-full lg:w-1/2">
        {/*Left Side Content*/}
        <nav className="flex flex-row h-[10%] items-center justify-evenly py-6 px-6 md:px-24 lg:justify-between">
          {/* Left section: Logo */}

          <div className="flex items-center justify-center w-full md:w-auto relative">
            <Link href="/">
              <div className="flex flex-col justify-center items-center text-xl font-semibold mx-auto md:mx-0">
                <h1 className="transform transition-all duration-200 hover:scale-110 hover:z-10 hover:shadow-lg active:scale-95">
                  Raptors
                </h1>
              </div>
            </Link>
          </div>

          <div className="lg:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="bg-mainPurple md:flex space-x-4 hover:cursor-pointer absolute top-4 right-4 md:relative md:top-0 md:right-0">
                  <AvatarImage></AvatarImage>
                  <AvatarFallback className="bg-black-500 text-white">
                    {avatarFallBack || "AV"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 text-white bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] border border-neutral-800 shadow-lg">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="" onClick={handleLogoutClick}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>
        {/* Create Event Form */}
        <div className="flex items-start justify-center h-screen pt-16">
          <form className="flex flex-col w-1/2 h-3/4 mr-[5rem] gap-7">
            <header>
              <h1 className="font-extrabold text-4xl">Create Event</h1>
            </header>
            <div className="flex flex-col gap-4">
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                id="title"
                placeholder="Event Title"
                className="border-none p-6 bg-neutral-800"
              ></Input>
            </div>
            <div className="flex flex-col gap-4 h-1/3">
              <Label htmlFor="content">Description</Label>
              <Textarea
                id="content"
                placeholder="Provide a brief description of the event"
                className="border-none p-6 bg-neutral-800 h-3/4 resize-none"
              ></Textarea>
            </div>
            <div className="flex flex-row justify-between mt-4">
              <Button className="flex justify-center items-center gap-[10px] rounded-lg  bg-[#1A202C] mt-[10px] hover:bg-[#1A202C] transform transition-all duration-200 hover:scale-110 hover:z-10 hover:shadow-lg active:scale-95">
                <MdArrowBack />
                Back
              </Button>

              <Button className="flex justify-center items-center gap-[10px] rounded-lg bg-mainPurple mt-[10px] hover:bg-mainPurple transform transition-all duration-200 hover:scale-110 hover:z-10 hover:shadow-lg active:scale-95">
                Next
                <MdArrowForward />
              </Button>
            </div>

            {/* <div className="flex flex-col gap-4">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md"
              />
            </div> */}
          </form>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-1/2 bg-[hsl(224,2%,4.2%)] hidden h-screen lg:block">
        <nav className="flex flex-col h-[10%] md:flex-row items-center md:items-center justify-end py-6 px-6 md:px-24">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="bg-mainPurple md:flex space-x-4 hover:cursor-pointer absolute top-4 right-4 md:relative md:top-0 md:right-0">
                <AvatarImage></AvatarImage>
                <AvatarFallback className="bg-black-500 text-white">
                  {avatarFallBack || "AV"}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 text-white bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] border border-neutral-800 shadow-lg">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>Settings</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="" onClick={handleLogoutClick}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </div>
  );
}

export default CreateEvent;

{
  /* <div className="dark flex items-center justify-center h-screen overflow-hidden">
      <Card className="mx-auto w-full max-w-lg min-h-[20rem] border-none flex flex-col p-6 overflow-hidden justify-center items-center">
        <CardHeader>
          {" "}
          <CardTitle className="text-2xl font-bold">Create Event</CardTitle>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div> */
}

//  <div className="dark flex items-center justify-center h-[100%] overflow-hidden">
//       <form className="space-y-6">
//         <h1 className="font-extrabold text-4xl text-center tracking-wide">
//           Create Event
//         </h1>
//         <div className="grid w-full max-w-sm items-center gap-1.5">
//           <Label htmlFor="title">Title</Label>
//           <Input
//             type="text"
//             id="title"
//             placeholder="Enter event title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </div>
//         <div className="grid w-full max-w-sm items-center gap-1.5">
//           <Label htmlFor="description">Description</Label>
//           <Input
//             type="text"
//             id="description"
//             placeholder="Provide a brief description of the event"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>
//         <div className="grid w-full max-w-sm items-center gap-1.5">
//           <Label htmlFor="image">Image</Label>
//           <Input
//             type="file"
//             id="image"
//             accept="image/*"
//             onChange={(e) => setImage(e.target.files?.[0] || null)}
//           />
//         </div>
//         <div className="flex flex-col w-full max-w-sm items-center gap-1.5 lg:items-start">
//           <Label htmlFor="date">Date</Label>
//           <Calendar
//             selected={selectedDate}
//             onChange={(date) => setSelectedDate(date)}
//           />
//         </div>
//         <Button type="submit">Create Event</Button>
//       </form>
//     </div>

{
  /* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="bg-mainPurple md:flex space-x-4 hover:cursor-pointer absolute top-4 right-4 md:relative md:top-0 md:right-0">
                <AvatarImage></AvatarImage>
                <AvatarFallback className="bg-black-500 text-white">
                  {avatarFallBack || "AV"}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 text-white bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] border border-neutral-800 shadow-lg">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>Settings</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="" onClick={handleLogoutClick}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */
}
