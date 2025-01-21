"use client";

import { SessionProvider } from "next-auth/react";
import { ChatStateProvider } from "./ChatStateProvider";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ChatStateProvider>
        {children}
      </ChatStateProvider>
    </SessionProvider>
  )
}
