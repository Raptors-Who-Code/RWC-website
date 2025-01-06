import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { getUser } from "@/api/userApi";
import { User } from "@/features/auth/authSlice";

export const AUTH = "auth";

const useAuth = (options?: UseQueryOptions<User>): UseQueryResult<User> => {
  const queryResult = useQuery<User>({
    queryKey: [AUTH],
    queryFn: getUser,
    staleTime: Infinity,
    ...options,
  });

  return queryResult;
};

export default useAuth;
