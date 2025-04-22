"use client";

import * as React from "react";

interface SelectProps {
  value: string;
  onValueChange: (val: string) => void;
  children: React.ReactNode;
}

export function Select({ value, onValueChange, children }: SelectProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className="w-full bg-zinc-800 border border-zinc-700 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {children}
      </select>
    </div>
  );
}

export function SelectTrigger({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

export function SelectValue({ placeholder }: { placeholder: string }) {
  return <option value="">{placeholder}</option>;
}

export function SelectContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

export function SelectItem({ value, children }: { value: string; children: React.ReactNode }) {
  return <option value={value}>{children}</option>;
}
