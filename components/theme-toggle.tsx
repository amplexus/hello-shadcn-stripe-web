"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { Button } from "./ui/button"

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()

  const handleThemeToggle = () => {
    if (theme == "dark")
      setTheme("light")
    else
      setTheme("dark")
  }

  return (
    <Button variant="outline" size="icon" onClick={handleThemeToggle}>
      <span className="sr-only">Toggle theme</span>
      {theme == "dark" &&
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      }
      {theme != "dark" &&
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      }
    </Button>

  )
}


