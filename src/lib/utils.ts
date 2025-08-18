import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines and optimizes CSS class names using clsx and tailwind-merge.
 * Resolves Tailwind CSS class conflicts by keeping the last conflicting class,
 * enabling conditional styling and dynamic class composition without style collisions.
 * 
 * @param inputs - Class names, objects, arrays, or conditional expressions to merge
 * @returns Optimized string of non-conflicting CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}