"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface ResumeFullscreenDialogProps {
  pdfUrl: string;
  open: boolean;
  onClose: () => void;
}

export function ResumeFullscreenDialog({
  pdfUrl,
  open,
  onClose,
}: ResumeFullscreenDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) onClose();
      }}
    >
      <DialogContent
        className="grid h-[95vh] w-[95vw] max-w-none grid-rows-[auto_minmax(0,1fr)] gap-0 p-0"
        aria-describedby={undefined}
      >
        <div className="border-b bg-background p-4">
          <DialogTitle className="text-lg font-semibold">
            Resume - Fullscreen View
          </DialogTitle>
        </div>

        <div className="min-h-0 p-4">
          <iframe
            src={`${pdfUrl}#toolbar=0&view=FitH`}
            title="Kelvin You resume fullscreen view"
            className="h-full w-full rounded-lg border border-border/40 bg-white"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
