export const Participants = () => {
    return (
        <div className="absolute top-2 right-2 h-12 bg-white rounded-md p-3 flex items-center shadow-md">
            List of users
        </div>
    )
}

Participants.Skeleton = function ParticipantsSkeleton() {
    return (
        <div 
            className="absolute top-2 right-2 h-12 bg-white rounded-md p-3 flex items-center shadow-md w-[120px]"
        />
    )
}