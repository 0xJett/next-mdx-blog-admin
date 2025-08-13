"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon">
        <div className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  const getCurrentIcon = () => {
    switch (theme) {
      case "light":
        return Sun;
      case "dark":
        return Moon;
      case "system":
        return SunMoon;
      default:
        return SunMoon;
    }
  };

  const CurrentIcon = getCurrentIcon();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative group">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={theme}
              initial={{ opacity: 0, scale: 0.6, rotate: -15 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.6, rotate: 15 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
                duration: 0.2,
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <CurrentIcon className="size-5" />
            </motion.div>
          </AnimatePresence>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="mr-2 h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="mr-2 h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <SunMoon className="mr-2 h-4 w-4" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
