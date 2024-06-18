import { Canvas } from "./_components/canvas"

import { Room } from "@/components/room"
import { Loading } from "./_components/loading"

interface BoardIDPageProps {
    params: {
        boardId: string;
    }   
}

const BoardIDPage = ({
    params,
}: BoardIDPageProps) => {
    return (
        <Room roomId={params.boardId} fallback={<Loading />}>
            <Canvas boardId={params.boardId} />
        </Room>
    )
}

export default BoardIDPage;