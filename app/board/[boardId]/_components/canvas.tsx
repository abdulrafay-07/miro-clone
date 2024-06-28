'use client'

import { useCallback, useState } from "react"

import {
    Camera,
    CanvasMode,
    CanvasState,
    Color,
    LayerType,
    Point,
} from "@/types/canvas"

import { Info } from "./info"
import { Participants } from "./participants"
import { Toolbar } from "./toolbar"
import { CursorsPresence } from "./cursors-presence"
import { LayerPreview } from "./layer-preview"

import { PointerEventToCanvasPoint } from "@/lib/utils"

import {
    useHistory,
    useCanUndo,
    useCanRedo,
    useMutation,
    useStorage,
} from "@/liveblocks.config"
import { LiveObject } from "@liveblocks/client"
import { nanoid } from "nanoid"

const MAX_LAYERS = 100;

interface CanvasProps {
    boardId: string;
}

export const Canvas = ({
    boardId,
}: CanvasProps) => {
    // layerIds are information that we need to display on our canvas
    const layerIds = useStorage((root) => root.layerIds);

    const [canvasState, setCanvasState] = useState<CanvasState>({
        mode: CanvasMode.None,
    });

    const [camera, setCamera] = useState<Camera>({
        x: 0,
        y: 0,
    });

    const [lastUserColor, setLastUserColor] = useState<Color>({
        r: 0,
        g: 0,
        b: 0,
    });

    const history = useHistory();
    const canUndo = useCanUndo();
    const canRedo = useCanRedo();

    const insertLayer = useMutation((
        { storage, setMyPresence },
        layerType: LayerType.Rectangle | LayerType.Triangle | LayerType.Ellipse | LayerType.Text | LayerType.Note,
        position: Point,
    ) => {
        // get layers
        const liveLayers = storage.get("layers");
        // if the layers are >= 100, we stop the function
        if (liveLayers.size >= MAX_LAYERS) {
            return;
        }

        const liveLayerIds = storage.get("layerIds");
        const layerId = nanoid();
        const layer = new LiveObject({
            type: layerType,
            x: position.x,
            y: position.y,
            height: 100,
            width: 100,
            fill: lastUserColor,
        });

        // add new layer id
        liveLayerIds.push(layerId);
        // add the layer
        liveLayers.set(layerId, layer);

        setMyPresence(
            { selection: [layerId] },
            { addToHistory: true }
        );
        setCanvasState({ mode: CanvasMode.None });
    }, [lastUserColor])

    // will change the camera position (so we have infinite canvas)
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

    const onPointerUp = useMutation((
        {},
        e
    ) => {
        // point is where we will insert something
        const point = PointerEventToCanvasPoint(e, camera);

        if (canvasState.mode === CanvasMode.Inserting) {
            insertLayer(canvasState.layerType, point);
        } else {
            setCanvasState({
                mode: CanvasMode.None,
            });
        }

        history.resume();
    }, [camera, canvasState, history, insertLayer])

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
                onPointerUp={onPointerUp}
            >
                <g
                    style={{
                        transform: `translate(${camera.x}px, ${camera.y}px)`
                    }}
                >
                    {layerIds?.map((layerId) => (
                        <LayerPreview
                            key={layerId}
                            id={layerId}
                            onLayerPointerDown={() => {}}
                            selectionColor={"#000"}
                        />
                    ))}
                    <CursorsPresence />
                </g>
            </svg>
        </main>
    )
}