"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "./ui/button"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  
  React.useEffect(() => {
    setMounted(true)
  }, [])

  
  if (!mounted) {
    return <Button variant={'outline'} size={'icon'} />
  }

  return (
    <>
      {
        theme === 'dark' ? (
          <Button variant={'outline'} onClick={()=>setTheme('light')} size={'icon'}>
            <Sun />
          </Button>
        ) : (
          <Button variant={'outline'} onClick={()=>setTheme('dark')} size={'icon'}>
            <Moon />
          </Button>
        )
      }
    </>
  )
}
