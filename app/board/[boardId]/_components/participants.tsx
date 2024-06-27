'use client'

import { ConnectionIdToColor } from "@/lib/utils"
import { UserAvatar } from "./user-avatar"

import { useOthers, useSelf } from "@liveblocks/react"

// max shown users (excluding you) avatars
const MAX_SHOWN_USERS = 2;

export const Participants = () => {
    const otherUsers = useOthers();
    const user = useSelf();
    const hasMoreUsers = otherUsers.length > MAX_SHOWN_USERS;

    return (
        <div className="absolute top-2 right-2 h-12 bg-white rounded-md p-3 flex items-center shadow-md">
            <div className="flex gap-x-2">
                {otherUsers.slice(0, MAX_SHOWN_USERS)
                    .map(({ connectionId, info }) => {
                        return (
                            <UserAvatar
                                key={connectionId}
                                borderColor={ConnectionIdToColor(connectionId)}
                                src={info?.picture}
                                name={info?.name}
                                fallback={info?.name?.[0] || "T"}
                            />
                        )
                    })
                }

                {user && (
                    <UserAvatar
                        borderColor={ConnectionIdToColor(user.connectionId)}
                        src={user.info?.picture}
                        name={`${user.info?.name} (You)`}
                        fallback={user.info?.name?.[0] || "Y"}
                    />
                )}

                {hasMoreUsers && (
                    <UserAvatar
                        name={`${otherUsers.length - MAX_SHOWN_USERS} more`}
                        fallback={`+${otherUsers.length - MAX_SHOWN_USERS}`}
                    />
                )}
            </div>
        </div>
    )
}

export const ParticipantsSkeleton = () => {
    return (
        <div 
            className="absolute top-2 right-2 h-12 bg-white rounded-md p-3 flex items-center shadow-md w-[120px]"
        />
    )
}