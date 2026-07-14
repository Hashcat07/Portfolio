import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Standard shadcn class-merge helper used by /components/ui parts.
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
