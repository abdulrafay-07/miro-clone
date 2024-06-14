'use client'

import { ClerkProvider, useAuth } from "@clerk/nextjs"
import { ConvexProviderWithClerk } from "convex/react-clerk"
import {
    AuthLoading,
    Authenticated,
    ConvexReactClient
} from "convex/react"
import { Loading } from "@/components/auth/loading"

interface ConvexClientProviderProps {
    children: React.ReactNode;
}

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!; // ! means it is never undefined

// convex instance
const convex = new ConvexReactClient(convexUrl);

export const ConvexClientProvider = ({
    children
}: ConvexClientProviderProps) => {
    return (
        <ClerkProvider>
            <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
                {/* render the children only if user is authenticated */}
                <Authenticated>
                    {children}
                </Authenticated>
                {/* if user is loading */}
                <AuthLoading>
                    <Loading />
                </AuthLoading>
            </ConvexProviderWithClerk>
        </ClerkProvider>
    )
}