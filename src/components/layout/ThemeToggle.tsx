import { useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Theme = "light" | "dark" | "system";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>("system");

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    
    // Apply theme logic
    const root = window.document.documentElement;
    
    if (newTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.toggle("dark", systemTheme === "dark");
    } else {
      root.classList.toggle("dark", newTheme === "dark");
    }
  };

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="w-4 h-4" />;
      case "dark":
        return <Moon className="w-4 h-4" />;
      default:
        return <Monitor className="w-4 h-4" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          {getThemeIcon()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[120px]">
        <DropdownMenuItem 
          onClick={() => handleThemeChange("light")}
          className="flex items-center gap-2"
        >
          <Sun className="w-4 h-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleThemeChange("dark")}
          className="flex items-center gap-2"
        >
          <Moon className="w-4 h-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleThemeChange("system")}
          className="flex items-center gap-2"
        >
          <Monitor className="w-4 h-4" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggle;