import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Key } from "lucide-react";

interface KeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (key: string) => void;
  currentKey: string;
}

export function KeyModal({ isOpen, onClose, onSave, currentKey }: KeyModalProps) {
  const [key, setKey] = useState(currentKey);

  useEffect(() => {
    setKey(currentKey);
  }, [currentKey]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key className="w-5 h-5 text-primary" />
            Gemini API Key
          </DialogTitle>
          <DialogDescription>
            Your keys are stored locally in your browser and never leave your device.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            placeholder="Paste your API key here..."
            value={key}
            onChange={(e) => setKey(e.target.value)}
            type="password"
            className="font-mono"
          />
          <p className="text-xs text-muted-foreground">
            Don't have a key? Get one for free at{" "}
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline font-medium"
            >
              Google AI Studio
            </a>.
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={() => onSave(key)}>Save Key</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
