'use client'

import { memo } from "react"
import { MousePointer2 } from "lucide-react"

import { ConnectionIdToColor } from "@/lib/utils"

import { useOther } from "@/liveblocks.config"

interface CursorProps {
    connectionId: number;
}

export const Cursor = memo(({
    connectionId
}: CursorProps) => {
    // extracts user info from connectionId
    const info = useOther(connectionId, (user) => user?.info);

    const cursor = useOther(connectionId, (user) => user.presence.cursor);

    const name = info?.name || "Teammate";

    if (!cursor) {
        return null;
    }

    const { x, y } = cursor;

    return (
        // in order to render the icon inside of an svg parent we use: foreignObject
        <foreignObject
            style={{
                transform: `translateX(${x}px) translateY(${y}px)`
            }}
            height={50}
            // name.length * 10 + offset of padding
            width={name.length * 10 + 24}
            className="relative drop-shadow-md"
        >
            <MousePointer2
                className="h-5 w-5"
                style={{
                    fill: ConnectionIdToColor(connectionId),
                    color: ConnectionIdToColor(connectionId),
                }}
            />
            <div
                className="absolute left-5 px-1.5 py-0.5 rounded-md text-xs text-white fond-semibold"
                style={{ backgroundColor: ConnectionIdToColor(connectionId) }}
            >
                {name}
            </div>
        </foreignObject>
    )
})

Cursor.displayName = "Cursor";