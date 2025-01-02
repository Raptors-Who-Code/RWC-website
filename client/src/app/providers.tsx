"use client";

import StoreProvider from "./redux";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/config/queryClient";
import Navbar from "./LandingPage/Navbar";
import { usePathname } from "next/navigation";

export default function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        {!pathname.startsWith("/verify-email") && <Navbar />}
        {children}
        <ProgressBar
          height="4px"
          color="#9632D7"
          options={{ showSpinner: false }}
          shallowRouting
        />
      </StoreProvider>
      <ReactQueryDevtools initialIsOpen={false} position="bottom" />
    </QueryClientProvider>
  );
}
