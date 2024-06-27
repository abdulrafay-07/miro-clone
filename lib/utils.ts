import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { Camera } from "@/types/canvas"

const COLORS = [
  "#DC2626",
  "#D97706",
  "#059669",
  "#7C3AED",
  "#DB2777",
  "#B8CC99",
  "#A910B0",
  "#101999"
];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function ConnectionIdToColor(connectionId: number): string {
  return COLORS[connectionId % COLORS.length];
}

// since the onWheel gives the user to have infinite canvas, the x and y coordinates will have to be calculated according to the onWheel as well as pointer move event
export function PointerEventToCanvasPoint(
  e: React.PointerEvent,
  camera: Camera
) {
  return {
    x: Math.round(e.clientX - camera.x),
    y: Math.round(e.clientY - camera.y),
  }
}