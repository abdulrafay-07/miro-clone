// creates a room in liveblocks

'use client'

import { ReactNode } from "react"
import { ClientSideSuspense } from "@liveblocks/react"

import { RoomProvider } from "@/liveblocks.config"
import {
    LiveList,
    LiveMap,
    LiveObject,
} from "@liveblocks/client"

import { Layer } from "@/types/canvas"

interface RoomProps {
    children: ReactNode;
    roomId: string;
    fallback: ReactNode;
}

export const Room = ({
    children,
    roomId,
    fallback,
}: RoomProps) => {
    return (
        <RoomProvider
            id={roomId}
            initialPresence={{
                cursor: null,
                selection: []
            }}
            initialStorage={{
                layers: new LiveMap<string, LiveObject<Layer>>(),
                // TEMP: added an empty array inside to fix the error
                layerIds: new LiveList([]),
            }}
        >
            <ClientSideSuspense fallback={fallback}>
                {() => children}
            </ClientSideSuspense>
        </RoomProvider>
    )
}