import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

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