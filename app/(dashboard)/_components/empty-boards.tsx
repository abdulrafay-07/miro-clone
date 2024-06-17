'use client'

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

import { api } from "@/convex/_generated/api"
import { useOrganization } from "@clerk/nextjs"

// hook to create a board
import { useApiMutation } from "@/hooks/use-api-mutation"

export const EmptyBoards = () => {
    const router = useRouter();

    const { organization } = useOrganization();

    // create a board
    const { mutate, pending } = useApiMutation(api.board.create);

    const onClick = () => {
        if (!organization) return;

        mutate({
            orgId: organization.id,
            title: "Untitled",
        }).then((id) => {
            toast.success("Board created");
            router.push(`/board/${id}`)
        }).catch(() => toast.error("Failed to create board"))
    }

    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image
                alt="empty"
                src="/note.svg"
                height={110}
                width={110}
            />
            <h2 className="text-2xl font-semibold mt-6">
                Create your first board!
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
                Start by creating a board for your organization
            </p>
            <div className="mt-6">
                <Button disabled={pending} onClick={onClick} size="lg">
                    Create Board
                </Button>
            </div>
        </div>
    )
}