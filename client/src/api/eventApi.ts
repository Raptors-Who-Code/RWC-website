import API from "@/config/apiClient";

export interface Event {
  title: string;
  content: string;
  date: Date;
  image?: File | undefined;
}

export const createEvent = async (eventData: Event) => {
  const formData = new FormData();

  formData.append("title", eventData.title);
  formData.append("content", eventData.content);
  formData.append("date", eventData.date.toISOString());
  if (eventData.image) {
    formData.append("image", eventData.image);
  }

  try {
    const response = await API.post("/api/events", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.error("Error creating event", error);
    throw error;
  }
};
