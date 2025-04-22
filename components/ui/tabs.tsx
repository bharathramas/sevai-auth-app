'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export function Tabs({ defaultValue, className, children }: any) {
  const [value, setValue] = React.useState(defaultValue);
  return (
    <div className={cn('w-full', className)}>
      {React.Children.map(children, (child: any) =>
        React.cloneElement(child, { value, setValue })
      )}
    </div>
  );
}

export function TabsList({ children, className }: any) {
  return <div className={cn('flex gap-2 border-b border-zinc-800 pb-2', className)}>{children}</div>;
}

export function TabsTrigger({ value: tabValue, value, setValue, children, className }: any) {
  const isActive = tabValue === value;
  return (
    <button
      onClick={() => setValue(tabValue)}
      className={cn(
        'px-4 py-2 text-sm font-medium rounded',
        isActive ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white',
        className
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, value: tabValue, className }: any) {
  if (value !== tabValue) return null;
  return <div className={className}>{children}</div>;
}
