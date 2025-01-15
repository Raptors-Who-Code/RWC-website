import { v4 as uuidv4 } from "uuid";
import { prismaClient } from "..";
import {
  ForbiddenException,
  InternalException,
  NotFoundException,
} from "../exceptions/exceptions";
import { ErrorCode } from "../exceptions/root";
import supabase from "../utils/supabaseStorage";
import { Event } from "../types/eventTypes";
import { UserData } from "../types/userTypes";

export const createEvent = async (
  eventData: Event,
  user: UserData,
  file: Express.Multer.File | undefined,
  fileBase64: ArrayBuffer | null
) => {
  let event;

  if (file && fileBase64) {
    // Generate a unique name for the image using UUID
    const uniqueImageName = `${uuidv4()}-${file.originalname}`;

    const filePath = `users/${user.id}/events/${uniqueImageName}`;

    // Upload image to Supabase Storage
    const { data, error } = await supabase.storage
      .from("images")
      .upload(filePath, fileBase64, {
        contentType: file.mimetype,
      });

    if (error) {
      console.log("Error uploading image", error);
      throw new InternalException(
        "Failed to upload image to Supabase Storage",
        ErrorCode.UPLOAD_FAILED
      );
    }

    //get public url of the uploaded file
    const { data: image } = supabase.storage
      .from("images")
      .getPublicUrl(data.path);

    event = await prismaClient.event.create({
      data: {
        ...eventData,
        imageUrl: image.publicUrl,
      },
    });
  } else {
    event = await prismaClient.event.create({
      data: {
        ...eventData,
      },
    });
  }

  return event;
};

export const deleteEvent = async (eventId: string, userId: string) => {
  const event = await prismaClient.event.findUnique({
    where: { id: eventId },
  });

  if (!event) {
    throw new NotFoundException("Event not found", ErrorCode.EVENT_NOT_FOUND);
  }

  const user = await prismaClient.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
  }

  const isUsersEvent = event.userId === userId;
  const isUserAdmin = user.role === "ADMIN";

  if (!isUsersEvent && !isUserAdmin) {
    throw new ForbiddenException(
      "You are not authorized to delete this event",
      ErrorCode.UNAUTHORIZED
    );
  }

  const deletedEvent = await prismaClient.event.delete({
    where: { id: eventId },
  });

  if (!deletedEvent) {
    throw new NotFoundException("Event not found", ErrorCode.EVENT_NOT_FOUND);
  }

  return deletedEvent;
};

export const updatedEvent = () => {};
