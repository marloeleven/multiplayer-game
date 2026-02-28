import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function once(cb: Function) {
  let called = false;
  return () => {
    if (called) {
      return;
    }

    called = true;

    cb();
  };
}
