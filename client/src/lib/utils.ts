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

export function sleep(ms = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function autoFocus(el: HTMLInputElement) {
  sleep().then(() => {
    if (el) {
      el.focus();
    }
  });
}
