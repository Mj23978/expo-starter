import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isRTL(locale: string): boolean {
  return locale === 'ar' || locale === 'he' || locale === 'fa';
}

