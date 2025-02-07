"use client";

import React, { createContext, useEffect, useState, useContext } from "react";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";
import { User } from "@/api/authApi";

const AuthContext = createContext<{
  user: any;
  isLoading: boolean;
  setClientUser: React.Dispatch<React.SetStateAction<any>>;
} | null>(null);

export const jobsAndEventsRoute = ["/events/create", "/jobs/create"];

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [clientUser, setClientUser] = useState<User | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const { data: user, isLoading, refetch } = useAuth();

  useEffect(() => {
    if (user) {
      setClientUser(user);
    } else {
      setClientUser(null);
    }
  }, [user]);

  useEffect(() => {
    refetch();
  }, [pathname, refetch]);

  useEffect(() => {
    if (!isLoading) {
      if (!clientUser && jobsAndEventsRoute.includes(pathname)) {
        toast.error("You must be logged in to create an event or job", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        router.replace("/login");
      } else if (clientUser && pathname === "/login") {
        router.replace("/");
      } else if (clientUser && !clientUser.verified && pathname === "/") {
        toast.warn("Please verifiy to access all features", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            backgroundColor: "black",
            color: "purple",
          },
        });
      }
    }
  }, [clientUser, isLoading, pathname]);

  return (
    <AuthContext.Provider
      value={{ user: clientUser, isLoading, setClientUser }}
    >
      {isLoading ? <div>Loading ...</div> : children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
};
