import API from "@/config/apiClient";

export interface Event {
  title: string;
  content: string;
  date: Date;
  image?: File | undefined;
}

export const createEvent = async (eventData: Event) =>
  API.post("/api/auth/login", eventData);
