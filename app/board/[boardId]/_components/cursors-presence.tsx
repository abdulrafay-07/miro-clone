'use client'

import { memo } from "react"
import { Cursor } from "./cursor";

import { useOthersConnectionIds } from "@liveblocks/react"

const Cursors = () => {
    const ids = useOthersConnectionIds();

    return (
        <>
            {ids.map((connectionId) => (
                <Cursor
                    key={connectionId}
                    connectionId={connectionId}
                />
            ))}
        </>
    )
}

export const CursorsPresence = memo(() => {
    return (
        <>
            {/* TODO: Draft pencil - track and display to all users what another user is drawing */}
            <Cursors />
        </>
    )
})

CursorsPresence.displayName = "CursorsPresence";