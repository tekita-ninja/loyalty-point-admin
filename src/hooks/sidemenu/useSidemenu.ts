import { useEffect, useState } from 'react'

export type TMenu  = {
  id: string
  title: string
  path?: string | null,
  icon?: string | null,
  isGroup?: boolean,
  order: number,
  children: TMenu[] | []
}

export function useSidemenu<T = TMenu[]>(key = 'sidemenus') {
  const [menus, setMenus] = useState<T | TMenu[]>([])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const item = localStorage.getItem(key)
        if (item) {
          setMenus(JSON.parse(item))
        }
      } catch (error) {
        console.error(`Failed to parse localStorage key "${key}":`, error)
      }
    }
  }, [key])

  return menus
}
