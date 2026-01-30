import React, { useEffect, useState } from "react";
import { Palette, Check, X } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "./ui/utils";
import { motion, AnimatePresence } from "framer-motion";

const themeCategories = [
  {
    name: "Standard Themes",
    themes: [
      { name: "zinc", label: "Default", color: "bg-zinc-900" },
      { name: "blue", label: "Professional", color: "bg-blue-600" },
      { name: "teal", label: "Fresh", color: "bg-teal-600" },
      { name: "violet", label: "Creative", color: "bg-violet-600" },
      { name: "orange", label: "Vibrant", color: "bg-orange-600" },
    ],
  },
  {
    name: "Premium Themes",
    themes: [
      { name: "coolors", label: "Ocean", color: "bg-gradient-to-br from-cyan-500 to-blue-600" },
      { name: "huemint", label: "Mint", color: "bg-emerald-500" },
      { name: "sunset", label: "Sunset", color: "bg-gradient-to-br from-purple-600 to-orange-500" },
    ],
  },
];

export function ThemeSwitcher() {
  const [theme, setTheme] = useState("zinc");
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <>
      {/* Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            size="icon"
            onClick={() => setIsOpen(true)}
            className="h-14 w-14 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl"
          >
            <Palette className="h-6 w-6" />
            <span className="sr-only">Customize Theme</span>
          </Button>
        </motion.div>
      </div>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
        )}
      </AnimatePresence>

      {/* Side Slider Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-96 bg-background border-l border-border shadow-2xl z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-background/95 backdrop-blur-xl border-b border-border px-6 py-4 flex items-center justify-between z-10">
              <div>
                <h2 className="text-xl font-bold text-foreground">Theme Settings</h2>
                <p className="text-sm text-muted-foreground">Customize your appearance</p>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8">
              {themeCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: categoryIndex * 0.1 }}
                  className="space-y-4"
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-2">
                    <div className="h-px flex-1 bg-border" />
                    <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      {category.name}
                    </h3>
                    <div className="h-px flex-1 bg-border" />
                  </div>

                  {/* Theme Options */}
                  <div className="space-y-2">
                    {category.themes.map((t) => (
                      <motion.button
                        key={t.name}
                        onClick={() => handleThemeChange(t.name)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={cn(
                          "w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all",
                          theme === t.name
                            ? "border-primary bg-primary/5 shadow-md"
                            : "border-border hover:border-primary/50 hover:bg-accent/50"
                        )}
                      >
                        {/* Color Preview */}
                        <div
                          className={cn(
                            "h-12 w-12 rounded-lg shrink-0 shadow-md ring-2 ring-offset-2 ring-offset-background transition-all",
                            t.color,
                            theme === t.name ? "ring-primary" : "ring-transparent"
                          )}
                        >
                          {theme === t.name && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="h-full w-full flex items-center justify-center"
                            >
                              <Check className="h-6 w-6 text-white drop-shadow-lg" />
                            </motion.div>
                          )}
                        </div>

                        {/* Theme Info */}
                        <div className="flex-1 text-left">
                          <p className="font-semibold text-foreground">{t.label}</p>
                          <p className="text-xs text-muted-foreground capitalize">{t.name} theme</p>
                        </div>

                        {/* Active Indicator */}
                        {theme === t.name && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="h-2 w-2 rounded-full bg-primary"
                          />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-background/95 backdrop-blur-xl border-t border-border px-6 py-4">
              <p className="text-xs text-center text-muted-foreground">
                Theme changes apply instantly across the application
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
