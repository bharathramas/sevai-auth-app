// components/FileDropZone.tsx
'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud } from 'lucide-react';

interface FileDropZoneProps {
  onFilesSelected: (files: File[]) => void;
  accept?: string[];
  disabled?: boolean;
}

export function FileDropZone({
  onFilesSelected,
  accept = ['.pdf', '.docx'],
  disabled = false,
}: FileDropZoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (!disabled && acceptedFiles.length > 0) {
        onFilesSelected(acceptedFiles);
      }
    },
    [disabled, onFilesSelected]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: accept.reduce((acc, ext) => {
      acc[ext] = [];
      return acc;
    }, {} as Record<string, string[]>),
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200
        ${isDragActive ? 'border-blue-500 bg-gray-800' : 'border-gray-700 bg-gray-900'}
        ${disabled ? 'opacity-50 pointer-events-none' : 'hover:border-blue-400'}`}
    >
      <input {...getInputProps()} disabled={disabled} />
      <div className="flex flex-col items-center justify-center space-y-2">
        <UploadCloud className="h-8 w-8 text-blue-500" />
        <p className="text-gray-300">
          {isDragActive ? 'Drop the files here...' : 'Click or drag files to upload'}
        </p>
        <p className="text-sm text-gray-500">Supported formats: .pdf, .docx</p>
      </div>
    </div>
  );
}
