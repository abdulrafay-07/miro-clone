'use client'

import { useCallback, useState } from "react"

import {
    Camera,
    CanvasMode,
    CanvasState
} from "@/types/canvas"

import { Info } from "./info"
import { Participants } from "./participants"
import { Toolbar } from "./toolbar"
import { CursorsPresence } from "./cursors-presence"

import { PointerEventToCanvasPoint } from "@/lib/utils"

import {
    useHistory,
    useCanUndo,
    useCanRedo,
    useMutation,
} from "@liveblocks/react"

interface CanvasProps {
    boardId: string;
}

export const Canvas = ({
    boardId,
}: CanvasProps) => {
    const [canvasState, setCanvasState] = useState<CanvasState>({
        mode: CanvasMode.None,
    });

    const [camera, setCamera] = useState<Camera>({
        x: 0,
        y: 0,
    });

    const history = useHistory();
    const canUndo = useCanUndo();
    const canRedo = useCanRedo();

    // will change the camera position (so we have infitinite canvas)
    const onWheel = useCallback((e: React.WheelEvent) => {
        setCamera((camera) => ({
            x: camera.x - e.deltaX,
            y: camera.x - e.deltaY,
        }));
    }, [])

    const onPointerMove = useMutation((
        { setMyPresence },
        e: React.PointerEvent,
    ) => {
        e.preventDefault();
        const current = PointerEventToCanvasPoint(e, camera);
        
        setMyPresence({ cursor: current });
    }, [])

    const onPointerLeave = useMutation(({ setMyPresence }) => {
        setMyPresence({ cursor: null });
    }, [])

    return (
        <main
            className="h-full w-full relative bg-neutral-100 touch-none"
        >
            <Info boardId={boardId} />
            <Participants />
            <Toolbar
                canvasState={canvasState}
                setCanvasState={setCanvasState}
                undo={history.undo}
                redo={history.redo}
                canUndo={canUndo}
                canRedo={canRedo}
            />
            <svg
                className="h-[100vh] w-[100vw]"
                onWheel={onWheel}
                onPointerMove={onPointerMove}
                onPointerLeave={onPointerLeave}
            >
                <g>
                    <CursorsPresence />
                </g>
            </svg>
        </main>
    )
}