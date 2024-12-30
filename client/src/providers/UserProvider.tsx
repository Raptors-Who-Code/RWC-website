import { useGetAuthenticatedUserQuery } from "@/features/auth/authApiSlice";
import { logout, setCredentials } from "@/features/auth/authSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

function UserProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const { data: user, error } = useGetAuthenticatedUserQuery();

  useEffect(() => {
    if (user) {
      dispatch(setCredentials({ user }));
    } else {
      dispatch(logout());
    }
  }, [user, error, dispatch]);

  return <>{children}</>;
}

export default UserProvider;
