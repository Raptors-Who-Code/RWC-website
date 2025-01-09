"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useAuth from "@/hooks/useAuth";
import { setCredentials } from "@/features/auth/authSlice";
import { toast } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const { data: user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      dispatch(setCredentials({ user }));
    }

    if (user && !user.verified) {
      toast.warn("Please verify your email to access all features.", {
        position: "top-right",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    // temporary fix
    //TODO: Replace with useAuth() hook in components themselves
    if (pathname === "/events/create" && !user) {
      toast.error("You must be logged in to create an event.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      router.replace("/login");
    }

    if (pathname === "/events/create" && user && !user.verified) {
      toast.error("You must be verified to create events", {
        position: "top-right",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      router.replace("/events");
    }
  }, [user, dispatch, pathname, router]);

  return <>{children}</>;
}
