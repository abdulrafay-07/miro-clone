// common types used for the canvas component

export type Color = {
    r: number;
    g: number;
    b: number;
}

export type Camera = {
    x: number;
    y: number;
}

export enum LayerType {
    Rectangle,
    Triangle,
    Ellipse,
    Path,
    Text,
    Note,
}

// type to determine where and how to render it in the canvas
export type RectangleLayer = {
    type: LayerType.Rectangle;
    x: number;
    y: number;
    height: number;
    width: number;
    fill: Color;
    value?: string;
}

export type TriangleLayer = {
    type: LayerType.Triangle;
    x: number;
    y: number;
    height: number;
    width: number;
    fill: Color;
    value?: string;
}

export type EllipseLayer = {
    type: LayerType.Ellipse;
    x: number;
    y: number;
    height: number;
    width: number;
    fill: Color;
    value?: string;
}

export type PathLayer = {
    type: LayerType.Path;
    x: number;
    y: number;
    height: number;
    width: number;
    fill: Color;
    points: number[][];
    value?: string;
}

export type TextLayer = {
    type: LayerType.Text;
    x: number;
    y: number;
    height: number;
    width: number;
    fill: Color;
    value?: string;
}

export type NoteLayer = {
    type: LayerType.Note;
    x: number;
    y: number;
    height: number;
    width: number;
    fill: Color;
    value?: string;
}

export type Point = {
    x: number;
    y: number;
}

export type XYWH = {
    x: number;
    y: number;
    width: number;
    height: number;
}

// will be used to resize something
export enum Side {
    Top = 1,
    Bottom = 2,
    Left = 4,
    Right = 8,
}

export type CanvasState =
    | {
        mode: CanvasMode.None;
    }
    | {
        mode: CanvasMode.SelectionNet;
        origin: Point;
        current?: Point;
    }
    | {
        mode: CanvasMode.Translating;
        current: Point;
    }
    | {
        mode: CanvasMode.Inserting;
        layerType: LayerType.Triangle | LayerType.Ellipse | LayerType.Rectangle | LayerType.Text | LayerType.Note;
    }
    | {
        mode: CanvasMode.Pencil;
    }
    | {
        mode: CanvasMode.Pressing;
        origin: Point;
    }
    | {
        mode: CanvasMode.Resizing;
        initialBounds: XYWH;
        corner: Side;
    }

export enum CanvasMode {
    None,
    Pressing,
    SelectionNet,
    Translating,
    Inserting,
    Resizing,
    Pencil,
}

export type Layer = RectangleLayer | TriangleLayer | EllipseLayer | PathLayer | TextLayer | NoteLayer;