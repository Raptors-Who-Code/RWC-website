"use client";

import React, { createContext, useEffect, useState, useContext } from "react";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";
import { User } from "@/api/authApi";
import { useMutation } from "@tanstack/react-query";
import { getUser } from "@/api/userApi";

const AuthContext = createContext<{
  user: any;
  isPending: boolean;
  setClientUser: React.Dispatch<React.SetStateAction<any>>;
} | null>(null);

export const protectedRoutesUserMustLoginIn = [
  "/events/create",
  "/jobs/create",
];

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [clientUser, setClientUser] = useState<User | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const {
    mutate: getTheUser,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: getUser,
    onSuccess: (data: User | null) => {
      setClientUser(data);
    },
  });

  useEffect(() => {
    getTheUser();
    if (!clientUser && !isPending) {
      setClientUser(null);
    }
  }, []);

  useEffect(() => {
    if (!isPending) {
      if (!clientUser && protectedRoutesUserMustLoginIn.includes(pathname)) {
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
  }, [clientUser, isPending, pathname, router]);

  return (
    <AuthContext.Provider
      value={{ user: clientUser, isPending, setClientUser }}
    >
      {isPending ? <div>Loading ...</div> : children}
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

// const dispatch = useDispatch();
//   const { data: user, isLoading } = useAuth();
//   const pathname = usePathname();
//   const router = useRouter();

//   useEffect(() => {
//     if (user) {
//       dispatch(setCredentials({ user }));
//     }
//   }, [user, dispatch, pathname, router]);

//   return <>{children}</>;

// if (user && !user.verified && pathname === "/") {
//   toast.warn("Please verify your email to access all features.", {
//     position: "top-right",
//     autoClose: false,
//     hideProgressBar: true,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//   });
// }

// // temporary fix
// //TODO: Replace with useAuth() hook in components themselves
// if (pathname === "/events/create" && !user) {
//   toast.error("You must be logged in to create an event.", {
//     position: "top-right",
//     autoClose: 5000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//   });
//   router.replace("/login");
// }

// if (pathname === "/login" && user) {
//   router.replace("/");
// }

// if (pathname === "/signup" && user) {
//   router.replace("/");
// }
