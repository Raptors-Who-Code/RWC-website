"use client";

import StoreProvider from "./redux";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      {children}
      <ProgressBar
        height="4px"
        color="#9632D7"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </StoreProvider>
  );
}
