import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showToast = (
  message: string,
  type: "success" | "error" | "info" | "warning" = "info"
) => {
  toast(message, { type });
};
