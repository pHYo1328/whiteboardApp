"use client";

import { ReactNode } from "react";
import { RoomProvider } from "../../../liveblocks.config";
import { ClientSideSuspense } from "@liveblocks/react";

export function Room({ children }: { children: ReactNode }) {
  const roomId = "testingRoom";
  return (
    <RoomProvider 
      id={roomId} 
      initialPresence={{
        cursor: null,
      }}
    >
      <ClientSideSuspense fallback={<div>Loading…</div>}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
}                                                                                          
