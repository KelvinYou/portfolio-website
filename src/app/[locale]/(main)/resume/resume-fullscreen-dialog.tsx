"use client";

import { PdfViewer } from "@/components/pdf-renderer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DocumentProps } from "@react-pdf/renderer";
import { Minimize2, X } from "lucide-react";
import React from "react";

interface ResumeFullscreenDialogProps {
  document: React.ReactElement<DocumentProps>;
  open: boolean;
  onClose: () => void;
}

export function ResumeFullscreenDialog({
  document,
  open,
  onClose,
}: ResumeFullscreenDialogProps) {
  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full p-0 gap-0">
        <div className="flex items-center justify-between p-4 border-b bg-background">
          <h2 className="text-lg font-semibold">Resume - Fullscreen View</h2>
          <div className="flex gap-2">
            <Button
              onClick={onClose}
              size="sm"
              variant="outline"
              className="gap-2"
              aria-label="Exit fullscreen view"
            >
              <Minimize2 className="h-4 w-4" />
              <span className="hidden sm:inline">Exit Fullscreen</span>
            </Button>
            <Button
              onClick={onClose}
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0"
              aria-label="Close dialog"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex-1 p-4 overflow-hidden">
          <div className="w-full h-full bg-background border border-border/40 rounded-lg">
            <PdfViewer>{document}</PdfViewer>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
