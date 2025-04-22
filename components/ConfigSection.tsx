"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Trash2, Plus } from "lucide-react";

interface ConfigSectionProps {
  section: string;
  values: string[];
  onChange: (section: string, updatedValues: string[]) => void;
  labelPrefix?: string;         // Optional: prefix like “Model”, “Role”
  placeholder?: string;         // Optional: placeholder text in input
}

export default function ConfigSection({
  section,
  values,
  onChange,
  labelPrefix = "",
  placeholder = "",
}: ConfigSectionProps) {
  function handleAdd() {
    const updated = [...values, ""];
    onChange(section, updated);
  }

  function handleChange(index: number, value: string) {
    const updated = [...values];
    updated[index] = value;
    onChange(section, updated);
  }

  function handleDelete(index: number) {
    const confirmed = window.confirm("Are you sure you want to delete this entry?");
    if (!confirmed) return;
    const updated = [...values];
    updated.splice(index, 1);
    onChange(section, updated);
  }

  return (
    <div className="space-y-4">
      {values.map((val, idx) => (
        <div key={idx} className="flex items-center gap-3">
          <Label className="text-zinc-400 w-6">
            {labelPrefix ? `${labelPrefix} ${idx + 1}` : `${idx + 1}.`}
          </Label>
          <Input
            value={val}
            onChange={(e) => handleChange(idx, e.target.value)}
            placeholder={placeholder}
            className="bg-zinc-800 border-zinc-700 text-white"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDelete(idx)}
            className="hover:text-red-500"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ))}

      <Button
        onClick={handleAdd}
        className="bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold px-4 py-2 rounded-lg shadow hover:from-blue-700 hover:to-blue-500 transition-all flex items-center gap-2"
      >
        <Plus className="w-4 h-4 text-white" />
        Add Option
      </Button>
    </div>
  );
}
