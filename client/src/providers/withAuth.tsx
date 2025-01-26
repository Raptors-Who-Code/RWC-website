import { useEffect } from "react";
import { useAuthContext } from "./AuthProvider";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function withAuth(Component: React.FC, redirectTo = "/login") {
  return function ProtectedComponent(props: any) {
    const { user, isPending } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
      if (!isPending && !user) {
        // Redirect if the user is not authenticated
        router.replace(redirectTo);
      }
    }, [user, isPending, router, redirectTo]);

    if (isPending) {
      // Show a loading spinner or placeholder during auth state resolution
      return <div>Loading...</div>;
    }

    if (!user) {
      return null; // Prevent rendering protected content
    }

    return <Component {...props} />;
  };
}
