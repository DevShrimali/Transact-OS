import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Label } from "@/app/components/ui/label";
import { Lightbulb, ChevronRight } from "lucide-react";

interface Step {
  title: string;
  description: string;
}

interface HowToDialogProps {
  moduleName: string; // Unique key for localStorage (e.g., 'pos-howto')
  title: string;
  subtitle: string;
  steps: Step[];
}

export function HowToDialog({ moduleName, title, subtitle, steps }: HowToDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed this dialog
    const hasSeen = localStorage.getItem(`howto_seen_${moduleName}`);
    if (!hasSeen) {
      // Small delay to appear after page load feels more natural
      const timer = setTimeout(() => setIsOpen(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [moduleName]);

  const handleClose = () => {
    if (dontShowAgain) {
      localStorage.setItem(`howto_seen_${moduleName}`, 'true');
    }
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md sm:max-w-lg p-0 overflow-hidden border-none shadow-2xl">
        <div className="bg-primary/5 p-6 border-b border-primary/10 flex items-start gap-4">
           <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Lightbulb className="h-6 w-6 text-primary" />
           </div>
           <div className="space-y-1">
              <DialogTitle className="text-xl font-black tracking-tight">{title}</DialogTitle>
              <DialogDescription className="text-muted-foreground font-medium">{subtitle}</DialogDescription>
           </div>
        </div>

        <div className="p-6 space-y-6">
           <div className="space-y-4">
              {steps.map((step, idx) => (
                 <div key={idx} className="flex gap-4">
                    <div className="flex flex-col items-center">
                       <div className="h-6 w-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                          {idx + 1}
                       </div>
                       {idx !== steps.length - 1 && <div className="w-px h-full bg-slate-200 my-1" />}
                    </div>
                    <div className="pb-4">
                       <h4 className="text-sm font-bold text-slate-900">{step.title}</h4>
                       <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{step.description}</p>
                    </div>
                 </div>
              ))}
           </div>
        </div>

        <div className="p-4 bg-slate-50 flex items-center justify-between border-t">
           <div className="flex items-center space-x-2">
              <Checkbox 
                id="dont-show" 
                checked={dontShowAgain} 
                onCheckedChange={(checked) => setDontShowAgain(checked as boolean)} 
              />
              <Label htmlFor="dont-show" className="text-xs font-medium text-muted-foreground cursor-pointer">Don't show this again</Label>
           </div>
           <Button onClick={handleClose} className="gap-2 px-6">
              Got it <ChevronRight className="h-4 w-4" />
           </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
