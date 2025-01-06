"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useAuth from "@/hooks/useAuth";
import { setCredentials } from "@/features/auth/authSlice";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const { data: user } = useAuth();

  useEffect(() => {
    if (user) {
      dispatch(setCredentials({ user }));
    }
  }, [user, dispatch]);

  return <>{children}</>;
}
