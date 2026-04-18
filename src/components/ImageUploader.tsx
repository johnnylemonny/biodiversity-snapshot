import { useState, useCallback } from "react";
import { Upload, X, Loader2, Camera, FolderOpen } from "lucide-react";
import { Button } from "./ui/button";
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
    <div className="w-full">
      {!preview ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={onDrop}
          className={cn(
            "relative group cursor-pointer border-2 border-dashed rounded-[2.5rem] p-16 transition-all duration-500 flex flex-col items-center justify-center gap-6 bg-card botanical-shadow overflow-hidden",
            isDragging ? "border-primary bg-primary/2 scale-[1.01]" : "border-border hover:border-primary/40",
            isLoading && "pointer-events-none opacity-50"
          )}
        >
          {/* Subtle decorative corners */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/20 rounded-tl-[2.5rem]" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/20 rounded-tr-[2.5rem]" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/20 rounded-bl-[2.5rem]" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/20 rounded-br-[2.5rem]" />

          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
            accept="image/*"
            disabled={isLoading}
          />

          <input
            type="file"
            id="camera-capture"
            className="hidden"
            capture="environment"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
            accept="image/*"
            disabled={isLoading}
          />
          
          <div className="w-24 h-24 rounded-full bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-500">
            <Upload className="w-10 h-10 text-primary group-hover:-translate-y-1 transition-transform duration-500" />
          </div>
          
          <div className="text-center space-y-2">
            <p className="text-2xl font-serif font-semibold">Ready to identify?</p>
            <p className="text-muted-foreground">Drag your nature photo here or use the options below</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-2 w-full max-w-sm">
            <Button
              type="button"
              className="flex-1 h-12 rounded-2xl gap-2 font-bold shadow-lg shadow-primary/10"
              onClick={() => document.getElementById("camera-capture")?.click()}
            >
              <Camera className="w-5 h-5" />
              Take Photo
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="flex-1 h-12 rounded-2xl gap-2 font-bold border border-primary/10"
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              <FolderOpen className="w-5 h-5" />
              Upload Image
            </Button>
          </div>
        </div>
      ) : (
        <div className="relative group overflow-hidden rounded-[2.5rem] border border-border bg-card botanical-shadow transition-all duration-500">
          <img
            src={preview}
            alt="Specimen Preview"
            className={cn(
              "w-full aspect-4/3 sm:aspect-video object-cover transition-all duration-1000",
              isLoading ? "scale-105 blur-sm brightness-75 grayscale-[0.5]" : "group-hover:scale-105"
            )}
          />
          
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-background/40 backdrop-blur-[2px] text-foreground">
              <div className="relative flex items-center justify-center">
                <Loader2 className="w-16 h-16 text-primary animate-spin" />
                <div className="absolute inset-0 border-4 border-primary/10 rounded-full scale-150 animate-pulse" />
              </div>
              <div className="text-center space-y-1">
                <p className="text-xl font-serif font-bold">Analyzing Specimen</p>
                <p className="text-sm font-medium opacity-70">Consulting botanical records...</p>
              </div>
            </div>
          )}

          {!isLoading && (
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-6 right-6 rounded-full w-12 h-12 shadow-xl opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100"
              onClick={() => setPreview(null)}
            >
              <X className="w-6 h-6" />
            </Button>
          )}
          
          {/* Identification badge when not loading */}
          {!isLoading && (
            <div className="absolute bottom-6 left-6 px-4 py-2 bg-background border border-border rounded-full text-xs font-bold uppercase tracking-widest botanical-shadow animate-in slide-in-from-left-4 fade-in duration-500">
              Captured Specimen
            </div>
          )}
        </div>
      )}
    </div>
  );
}
