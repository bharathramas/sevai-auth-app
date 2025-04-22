'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export function Table({ children, className }: any) {
  return <table className={cn('w-full text-left text-sm', className)}>{children}</table>;
}

export function TableHead({ children }: any) {
  return <thead className="border-b border-zinc-700 text-zinc-400 uppercase text-xs">{children}</thead>;
}

export function TableBody({ children }: any) {
  return <tbody className="divide-y divide-zinc-800 text-white">{children}</tbody>;
}

export function TableRow({ children }: any) {
  return <tr className="hover:bg-zinc-900/50 transition-colors">{children}</tr>;
}

export function TableCell({ children, className }: any) {
  return <td className={cn('px-4 py-2 align-middle', className)}>{children}</td>;
}
