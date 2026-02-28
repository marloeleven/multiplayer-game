'use client';

import { cn } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import { PropsWithChildren, useState } from 'react';
import { Switch } from './ui/switch';

export function FloatingDebugger({ children }: PropsWithChildren) {
  const searchParams = useSearchParams();

  const [hide, setHide] = useState(() => !searchParams.has('debug'));

  return (
    <div
      className={cn(
        'fixed top-0 right-0 bg-white opacity-80 hover:opacity-100 p-2 rounded-sm',
        {
          hidden: hide,
        },
      )}
    >
      <Switch onCheckedChange={setHide} />
      <pre>{children}</pre>
    </div>
  );
}
