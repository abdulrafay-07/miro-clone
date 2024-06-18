import { Canvas } from "./_components/canvas"

interface BoardIDPageProps {
    params: {
        boardId: string;
    }   
}

const BoardIDPage = ({
    params,
}: BoardIDPageProps) => {
    return (
        <Canvas boardId={params.boardId} />
    )
}

export default BoardIDPage;