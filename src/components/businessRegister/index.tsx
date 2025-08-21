import React, { useCallback, useRef, useState } from 'react';
import axios from 'axios';

/**
 * SimpleDragDropImage
 * ----------------------------------------------------
 * Minimal drag & drop component for a single image file.
 *
 * Usage:
 *  <SimpleDragDropImage onChange={(file) => console.log(file)} />
 */

export type SimpleDragDropImageProps = {
  /** Allowed MIME types, e.g., "image/*" or "image/png,image/jpeg" */
  accept?: string;
  /** Maximum size per file in MB */
  maxSizeMB?: number;
  /** Called whenever a valid file is chosen */
  onChange: (file: File | null) => void;
  /** ClassName for the outer container */
  className?: string;
  /** Disable the input */
  disabled?: boolean;
};

export default function DragDropImage({
  accept = 'image/*',
  maxSizeMB = 5,
  onChange,
  className,
  disabled = false,
}: SimpleDragDropImageProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = useCallback(
    (filesLike: FileList | null) => {
      if (!filesLike || !filesLike.length) return;
      const file = filesLike[0];

      // type check
      if (accept && !file.type.match(accept.replace('*', '.*'))) {
        setError('Invalid file type.');
        onChange(null);
        return;
      }
      // size check
      const maxBytes = maxSizeMB * 1024 * 1024;
      if (file.size > maxBytes) {
        setError(`File exceeds ${maxSizeMB}MB.`);
        onChange(null);
        return;
      }

      setError(null);
      setFileName(file.name);
      onChange?.(file);
    },
    [accept, maxSizeMB, onChange],
  );

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles],
  );

  const openFileDialog = useCallback(() => {
    if (!disabled) inputRef.current?.click();
  }, [disabled]);

  const [businessImage, setBusinessImage] = useState<File | null>(null);

  const handleSumbit = async () => {
    const formData = new FormData();
    if (!businessImage) return;
    formData.append('file', businessImage);
    const response = await axios.post(`/upload_multer_multi`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response);
  };

  return (
    <div className={className}>
      <div
        role="button"
        tabIndex={0}
        aria-label="Image dropzone"
        onClick={openFileDialog}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openFileDialog();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragEnter={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setIsDragging(false);
        }}
        onDrop={onDrop}
        className={`flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 text-center transition ${
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:bg-gray-50'
        } ${disabled ? 'pointer-events-none opacity-60' : ''}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          disabled={disabled}
          className="hidden"
          onChange={(e) => handleFiles(e.currentTarget.files)}
        />
        <div className="text-sm text-gray-700">
          Drag & drop an image, or click to select
        </div>
        {fileName && (
          <div className="mt-2 text-xs text-gray-500">Selected: {fileName}</div>
        )}
        {error && <div className="mt-2 text-xs text-red-500">{error}</div>}
      </div>
    </div>
  );
}
