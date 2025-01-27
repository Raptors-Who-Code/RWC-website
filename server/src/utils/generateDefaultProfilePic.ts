import { createCanvas } from "canvas";

export const generateDefaultProfilePicture = async (
  firstName: string,
  lastName: string
) => {
  const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();

  const canvas = createCanvas(200, 200);
  const context = canvas.getContext("2d");

  // Draw purple background
  context.fillStyle = "#9632D7";
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Draw initials
  context.fillStyle = "#FFFFFF";
  context.font = "bold 100px Arial";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(initials, canvas.width / 2, canvas.height / 2);

  // Convert canvas to buffer

  const buffer = canvas.toBuffer("image/png");

  return buffer;
};
