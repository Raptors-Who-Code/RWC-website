"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getUser } from "@/api/userApi";
import { User } from "@/api/authApi";

export const AUTH = "auth";

const useAuth = (options = {}): UseQueryResult<User | null> => {
  const queryResult = useQuery<User | null, Error>({
    queryKey: [AUTH],
    queryFn: getUser,
    staleTime: Infinity,
    ...options,
  });

  return queryResult;
};

export default useAuth;
