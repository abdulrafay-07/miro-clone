'use client'

import { EmptyOrg } from "./_components/empty-org"
import { useOrganization } from "@clerk/nextjs"
import { BoardList } from "./_components/board-list"

// these props will be extracted from the url and display a component depending on the url
interface DashboardPageProps {
    searchParams: {
        search?: string;
        favourites?: string;
    }
}

// {JSON.stringify(searchParams)}
// we will use the line above to retrieve search and favourites params

const DashboardPage = ({
    searchParams
} : DashboardPageProps) => {
    // returns the list of user organizations
    const { organization } = useOrganization();

    return (
        <div className="flex-1 h-[calc(100%-80px)] p-6">
            {/* if there are not any organizations, return Empty organization component */}
            {!organization ? (
                <EmptyOrg />
            ) : (
                <BoardList
                    orgId={organization.id}
                    query={searchParams}
                />
            )}
        </div>
    )
}

export default DashboardPage;