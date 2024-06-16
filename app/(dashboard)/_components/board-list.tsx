'use client'

import { EmptySearch } from "./empty-search"
import { EmptyFavourites } from "./empty-favourites"
import { EmptyBoards } from "./empty-boards"

interface BoardListProps {
    orgId: string;
    query: {
        search?: string;
        favourites?: string;
    }
}

export const BoardList = ({
    orgId,
    query
}: BoardListProps) => {
    const data = []; // TODO: Change to API call

    // we dont have data.length but we have query.search
    if (!data?.length && query.search) {
        return (
            <EmptySearch />
        )
    }

    // we dont have data.length but we have query.favourites
    if (!data?.length && query.favourites) {
        return (
            <EmptyFavourites />
        )
    }

    // we dont have data.length
    if (!data?.length) {
        return (
            <EmptyBoards />
        )
    }

    return (
        <div>
            {JSON.stringify(query)}
        </div>
    )
}