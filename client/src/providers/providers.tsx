"use client";

import StoreProvider from "../app/redux";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/config/queryClient";
import Navbar from "../app/LandingPage/Navbar";
import { usePathname } from "next/navigation";
import AuthProvider from "./AuthProvider";
import { ToastContainer } from "react-toastify";

export default function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hideNavBar: boolean =
    pathname.startsWith("/verify-email") ||
    pathname.startsWith("/password/reset");

  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <AuthProvider>
          {hideNavBar || <Navbar />}
          {children}
          <ProgressBar
            height="4px"
            color="#9632D7"
            options={{ showSpinner: false }}
            shallowRouting
          />
          <ToastContainer theme="dark" autoClose={5000} position="top-right" />
        </AuthProvider>
      </StoreProvider>
      <ReactQueryDevtools initialIsOpen={false} position="bottom" />
    </QueryClientProvider>
  );
}
