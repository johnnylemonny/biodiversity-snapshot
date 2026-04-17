import { useState, useCallback } from "react";
import { Upload, ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  onImageSelected: (file: File) => void;
  isLoading: boolean;
}

export function ImageUploader({ onImageSelected, isLoading }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback((file: File) => {
    if (file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      onImageSelected(file);
    }
  }, [onImageSelected]);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {!preview ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={onDrop}
          className={cn(
            "relative group cursor-pointer border-2 border-dashed rounded-3xl p-12 transition-all duration-300 flex flex-col items-center justify-center gap-4 bg-card/50 hover:bg-card/80",
            isDragging ? "border-primary bg-primary/5 scale-[1.02]" : "border-muted-foreground/20",
            isLoading && "pointer-events-none opacity-50"
          )}
        >
          <input
            type="file"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
            accept="image/*"
            disabled={isLoading}
          />
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
            <Upload className="w-8 h-8 text-primary" />
          </div>
          <div className="text-center">
            <p className="text-xl font-semibold mb-1">Upload a Nature Photo</p>
            <p className="text-sm text-muted-foreground">Drag and drop or click to browse</p>
          </div>
          <div className="flex gap-4 mt-4">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full">
              <ImageIcon className="w-3.5 h-3.5" />
              JPG, PNG, WEBP
            </div>
          </div>
        </div>
      ) : (
        <div className="relative group overflow-hidden rounded-3xl border border-border bg-card shadow-2xl transition-all duration-500 hover:shadow-primary/5">
          <img
            src={preview}
            alt="Preview"
            className={cn(
              "w-full aspect-video object-cover transition-all duration-700",
              isLoading ? "blur-sm grayscale brightness-50" : "group-hover:scale-105"
            )}
          />
          
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
              </div>
              <p className="font-medium animate-pulse">Analyzing biodiversity...</p>
            </div>
          )}

          {!isLoading && (
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-4 right-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => setPreview(null)}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
