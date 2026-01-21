import React, { useEffect, useState } from "react";
import { Palette, Check } from "lucide-react";
import { Button } from "./ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "./ui/drawer";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { cn } from "./ui/utils";
import { useIsMobile } from "./ui/use-mobile";
import { motion } from "framer-motion";

const themes = [
  { name: "zinc", label: "Default", color: "bg-zinc-900" },
  { name: "blue", label: "Professional", color: "bg-blue-600" },
  { name: "teal", label: "Fresh", color: "bg-teal-600" },
  { name: "violet", label: "Creative", color: "bg-violet-600" },
  { name: "orange", label: "Vibrant", color: "bg-orange-600" },
];

export function ThemeSwitcher() {
  const [theme, setTheme] = useState("zinc");
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  // Initialize theme from local storage - Force Light Mode
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "zinc";
    
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);

    // Force remove dark mode
    document.documentElement.classList.remove("dark");
    localStorage.setItem("mode", "light");
  }, []);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <div className="fixed bottom-6 right-6 z-50">
            <Button
              size="icon"
              className="h-14 w-14 rounded-full shadow-lg"
            >
              <Palette className="h-6 w-6" />
              <span className="sr-only">Customize Theme</span>
            </Button>
          </div>
        </DrawerTrigger>
        <DrawerContent>
           <DrawerHeader className="text-left">
            <DrawerTitle>Theme Settings</DrawerTitle>
            <DrawerDescription>Customize your application appearance.</DrawerDescription>
          </DrawerHeader>
          <div className="px-4 pb-8 space-y-6">
             <div className="space-y-3">
               <span className="font-medium">Color Theme</span>
               <div className="grid grid-cols-5 gap-4">
                  {themes.map((t) => (
                      <button
                        key={t.name}
                        onClick={() => handleThemeChange(t.name)}
                        className={cn(
                          "relative flex aspect-square items-center justify-center rounded-full border-2 transition-all",
                          t.color,
                          theme === t.name 
                            ? "border-primary ring-2 ring-primary ring-offset-2 ring-offset-background" 
                            : "border-transparent opacity-80"
                        )}
                      >
                         {theme === t.name && <Check className="h-4 w-4 text-white" />}
                      </button>
                  ))}
               </div>
               <div className="flex justify-between px-1">
                 {themes.map(t => (
                   <span key={t.name} className="text-[10px] text-muted-foreground w-full text-center truncate px-0.5">{t.label}</span>
                 ))}
               </div>
             </div>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              size="icon"
              className="h-14 w-14 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <Palette className="h-6 w-6" />
              <span className="sr-only">Customize Theme</span>
            </Button>
          </motion.div>
        </PopoverTrigger>
        <PopoverContent 
             side="top" 
             align="end" 
             className="w-64 p-4 rounded-xl border-border/50 bg-background/95 backdrop-blur-xl shadow-2xl mb-2"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold leading-none text-foreground/80">Theme Settings</h4>
            </div>

            <div className="grid grid-cols-5 gap-2">
              <TooltipProvider delayDuration={0}>
                {themes.map((t) => (
                  <Tooltip key={t.name}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => handleThemeChange(t.name)}
                        className={cn(
                          "relative flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all hover:scale-110 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2",
                          t.color,
                          theme === t.name 
                            ? "border-primary ring-2 ring-primary ring-offset-2 ring-offset-background" 
                            : "border-transparent opacity-80 hover:opacity-100"
                        )}
                      >
                         {theme === t.name && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                <Check className="h-3 w-3 text-white drop-shadow-md" />
                            </motion.div>
                         )}
                        <span className="sr-only">{t.label}</span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="text-xs bg-foreground text-background">
                      {t.label}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
