'use client'

import Image from "next/image"
import Link from "next/link"
import { Poppins } from "next/font/google"
import { MenuIcon } from "lucide-react"

import { Hint } from "@/components/hint"
import { Button } from "@/components/ui/button"
import { useRenameModal } from "@/store/use-rename-modal"
import { Actions } from "@/components/actions"

import { useQuery } from "convex/react"

import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"

import { cn } from "@/lib/utils"

interface InfoProps {
    boardId: string,
}

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"],
})

const TabSeperator = () => {
    return (
        <div className="text-neutral-300 px-1.5">
            |
        </div>
    )
}

export const Info = ({
    boardId,
}: InfoProps) => {
    const { onOpen } = useRenameModal();

    const hintOptions = [
        {
            id: "info",
            name: "Go to boards",
        },
        {
            id: "title",
            name: "Edit title",
        },
        {
            id: "menu",
            name: "Main menu"
        },
    ];
    
    const data = useQuery(api.board.get, {
        // boardId as Id from convex, which is an id of the boards
        id: boardId as Id<"boards">
    });

    if (!data) return <InfoSkeleton />

    return (
        <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
            <Button
                asChild
                variant="board"
                className="px-2"
            >
                <Link
                    href="/"
                    data-tooltip-id={hintOptions[0].id} 
                    data-tooltip-content={hintOptions[0].name}
                >
                    <Hint id={hintOptions[0].id} place="bottom" className="-mt-1" />
                    <Image
                        src="/logo.svg"
                        alt="logo"
                        height={30}
                        width={30}
                    />
                    <span className={cn(
                        "font-semibold text-xl ml-2 text-black",
                        font.className
                    )}>
                        Board
                    </span>
                </Link>
            </Button>
            <TabSeperator />
            <Button
                variant="board"
                className="text-base font-normal px-2"
                onClick={() => onOpen(
                    data._id, data.title
                )}
                data-tooltip-id={hintOptions[1].id}
                data-tooltip-content={hintOptions[1].name}
            >
                <Hint id={hintOptions[1].id} place="bottom" className="-mt-1" />
                {data.title}
            </Button>
            <TabSeperator />
            <Actions
                id={data._id}
                title={data.title}
                side="bottom"
                sideOffset={10}
                renameAllowed={false}
            >
                <div data-tooltip-id={hintOptions[2].id} data-tooltip-content={hintOptions[2].name}>
                    <Hint id={hintOptions[2].id} place="bottom" />
                    <Button size="icon" variant="board">
                        <MenuIcon />
                    </Button>
                </div>
            </Actions>
        </div>
    )
}

export const InfoSkeleton = () => {
    return (
        <div
            className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]"
        />
    )
}