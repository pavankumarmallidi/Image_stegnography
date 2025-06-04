import React, { useState, useCallback } from 'react';
import { Upload, File } from 'lucide-react';

interface FileDropzoneProps {
  onFileSelected: (file: File) => void;
  accept?: string;
  label?: string;
  maxSize?: number; // in bytes
}

const FileDropzone: React.FC<FileDropzoneProps> = ({
  onFileSelected,
  accept = '*',
  label = 'Upload a file',
  maxSize = 5 * 1024 * 1024, // 5MB default
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  }, [isDragging]);

  const validateFile = useCallback((file: File): boolean => {
    setError(null);
    
    // Check file size
    if (file.size > maxSize) {
      setError(`File size exceeds the maximum limit of ${maxSize / (1024 * 1024)}MB.`);
      return false;
    }
    
    // Check file type if accept is specified
    if (accept !== '*') {
      const acceptedTypes = accept.split(',');
      const fileType = file.type;
      
      if (!acceptedTypes.some(type => {
        if (type.includes('/*')) {
          // Handle wildcards like 'image/*'
          const baseType = type.split('/')[0];
          return fileType.startsWith(`${baseType}/`);
        }
        return type === fileType;
      })) {
        setError(`File type not accepted. Please upload ${accept.replace(/,/g, ' or ')}.`);
        return false;
      }
    }
    
    return true;
  }, [accept, maxSize]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        onFileSelected(file);
      }
    }
  }, [onFileSelected, validateFile]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        onFileSelected(file);
      }
    }
  }, [onFileSelected, validateFile]);

  return (
    <div className="space-y-2">
      <div
        className={`file-dropzone ${isDragging ? 'file-dropzone-active' : ''}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          onChange={handleFileChange}
          accept={accept}
        />
        <div className="flex flex-col items-center justify-center space-y-2 pointer-events-none">
          {isDragging ? (
            <>
              <File className="h-10 w-10 text-accent animate-pulse" />
              <p className="text-sm font-medium">Drop your file here</p>
            </>
          ) : (
            <>
              <Upload className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm font-medium">{label}</p>
              <p className="text-xs text-muted-foreground">Drag & drop or click to browse</p>
            </>
          )}
        </div>
      </div>
      
      {error && (
        <div className="text-xs text-red-400 mt-1">{error}</div>
      )}
    </div>
  );
};

export default FileDropzone;