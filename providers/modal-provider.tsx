// component to make modals reusable and stop them from hydration error

'use client'

import { useEffect, useState } from "react"

import { RenameModal } from "@/components/modals/rename-modal"

export const ModalProvider = () => {
    // meaning the rendering starts in server side
    const [isMounted, setIsMounted] = useState(false);

    // only once i get to the client side, then i show it
    useEffect(() => {
        setIsMounted(true);
    }, [])

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <RenameModal />
        </>
    )
}