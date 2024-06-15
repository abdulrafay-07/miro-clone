'use client'

import Image from "next/image"
import {
    useOrganization,
    useOrganizationList
} from "@clerk/nextjs"

import { cn } from "@/lib/utils"
import { Hint } from "@/components/hint"

interface ItemProps {
    id: string,
    name: string,
    imageUrl: string
}

export const Item = ({
    id,
    name,
    imageUrl
}: ItemProps) => {
    const id_: string = "org_name";

    // get the current organization
    const { organization } = useOrganization();
    const { setActive } = useOrganizationList();

    // check if current organization is active (matches the id from the props)
    const isActive = organization?.id === id;

    const onClick = () => {
        // if there is no setActive
        if (!setActive) return;

        setActive({ organization: id })
    }

    return (
        <div className="aspect-square relative" data-tooltip-id={id_} data-tooltip-content={name}>
            <Hint id={id_} place="right" className="ml-1" />
            <Image
                fill
                alt={name}
                src={imageUrl}
                onClick={onClick}
                className={cn(
                    "rounded-md cursor-pointer opacity-75 hover:opacity-100 transition",
                    isActive && "opacity-100"
                )}
            />
        </div>
    )
}