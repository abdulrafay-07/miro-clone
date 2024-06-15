'use client'

import Link from "next/link"
import Image from "next/image"
import { Poppins } from "next/font/google"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Star } from "lucide-react"
import { useSearchParams } from "next/navigation"

import { cn } from "@/lib/utils"
import { OrganizationSwitcher } from "@clerk/nextjs"

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"],
})

export const OrgSidebar = () => {
    // get query from params so we can highlight the button
    const searchParams = useSearchParams();
    const favourites = searchParams.get("favourites");

    return (
        <div className="hidden lg:flex flex-col space-y-6 w-[206px] pl-5 pt-5">
            <Link href="/">
                <div className="flex items-center gap-x-2">
                    <Image
                        alt="logo"
                        src="/logo.svg"
                        height={50}
                        width={50}
                    />
                    <span className={cn(
                        "font-semibold text-2xl",
                        font.className
                    )}>
                        Board
                    </span>
                </div>
            </Link>
            {/* gives a dropdown to manage organizations */}
            <OrganizationSwitcher
                hidePersonal
                appearance={{
                    elements: {
                        rootBox: {
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                        },
                        organizationSwitcherTrigger: {
                            padding: "6px",
                            width: "100%",
                            borderRadius: "8px",
                            border: "1px solid #E5E7EB",
                            justifyContent: "space-between",
                            backgroundColor: "white"
                        }
                    }
                }}
            />
            <div className="space-y-1 w-full">
                <Button
                    // if url has favourites query set team boards button variant to ghost
                    variant={favourites ? "ghost" : "secondary"}
                    asChild
                    size="lg"
                    className="font-normal justify-start px-2 w-full"
                >
                    <Link href="/">
                        <LayoutDashboard className="h-4 w-4 mr-2" />
                        Team Boards
                    </Link>
                </Button>
                <Button
                    // if url has favourites query set team boards button variant to secondary
                    variant={favourites ? "secondary" : "ghost"}
                    asChild
                    size="lg"
                    className="font-normal justify-start px-2 w-full"
                >
                    <Link
                        href={{
                            pathname: "/",
                            query: { favourites: true }
                        }}
                    >
                        <Star className="h-4 w-4 mr-2" />
                        Favourite Boards
                    </Link>
                </Button>
            </div>
        </div>
    )
}