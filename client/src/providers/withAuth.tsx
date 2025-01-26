import { useEffect } from "react";
import { useAuthContext } from "./AuthProvider";
import { useRouter } from "next/navigation";

export default function withAuth(Component: React.FC, redirectTo = "/login") {
  return function ProtectedComponent(props: any) {
    const { user, isLoading } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && !user) {
        // Redirect if the user is not authenticated
        router.replace(redirectTo);
      }
    }, [user, isLoading, router, redirectTo]);

    if (isLoading) {
      // Show a loading spinner or placeholder during auth state resolution
      return <div>Loading...</div>;
    }

    if (!user) {
      return null; // Prevent rendering protected content
    }

    return <Component {...props} />;
  };
}
