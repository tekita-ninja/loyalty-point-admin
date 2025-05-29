'use client'

import { TMenu, useSidemenu } from '@/hooks/sidemenu/useSidemenu'
import { cn } from '@/lib/utils'
import useSideMenu from '@/store/useSideMenu'
import { Icon } from "@iconify/react"
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment, useEffect, useState } from 'react'
import { Menu, menuClasses, MenuItem, MenuItemStyles, Sidebar, SubMenu } from 'react-pro-sidebar'
import SidemenuItemLoader from './sidemenu-item-loader'
import { sidebarTheme } from './style'

export default function SidebarMenu() {
  const menus = useSidemenu()
  const { resolvedTheme } = useTheme()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const { isOpen } = useSideMenu()

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = resolvedTheme === 'dark'
  const themes = sidebarTheme(isDark)
  const themeStyle = themes[resolvedTheme as 'dark' | 'light']
  const menuItemStyles: MenuItemStyles = {
    root: {
      backgroundColor: 'transparent',
      fontSize: '14px',
      fontWeight: 500,
    },
    icon: {
      color: themeStyle?.menu.icon,
      [`&.${menuClasses.disabled}`]: {
        color: themeStyle?.menu.disabled.color,
      },
    },
    SubMenuExpandIcon: {
      color: isDark ? '#FFF' : '#0F172A',
    },
    subMenuContent: () => ({
      backgroundColor: isDark ? '#0F172A' : '#FFF',
    }),
    button: {
      height: 43,
      [`&.${menuClasses.disabled}`]: {
        color: themeStyle?.menu.disabled.color,
      },
      '&:hover': {
        backgroundColor: 'transparent',
        color: themeStyle?.menu.hover.color,
      },
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
    }),
  }

  const isPathInTree = (items: TMenu[], currentPath: string): boolean => {
    return items.some(item => {
      if (item.path === currentPath) return true
      if (item.children && item.children.length > 0) {
        return isPathInTree(item.children, currentPath)
      }
      return false
    })
  }

  const renderMenuItems = (items: TMenu[]): JSX.Element[] => {
    return items.map(item => {
      const hasChildren = item.children && item.children.length > 0
      const isActive = pathname === item.path
      const shouldOpen = hasChildren && isPathInTree(item.children, pathname)

      if (hasChildren) {
        return (
          <SubMenu
            key={item.id}
            defaultOpen={shouldOpen}
            icon={<Icon className="h-4 w-4" icon={item.icon || ''} />}
            label={item.title}
          >
            {renderMenuItems(item.children)}
          </SubMenu>
        )
      }

      return (
        <MenuItem
          key={item.id}
          component={<Link href={item.path || '#'} />}
          active={isActive}
          icon={<Icon className="h-4 w-4" icon={item.icon || ''} />}
        >
          {item.title}
        </MenuItem>
      )
    })
  }

  return (
    <div className="flex-1 no-sroll-thumb overflow-y-auto">
      {
        mounted ? (
          <Sidebar
            rootStyles={{
              height: '100%',
              width: '100%',
              border: 'none',
              backgroundColor: 'transparent',
              color: themeStyle?.sidebar?.color,
            }}
            collapsed={!isOpen}
            collapsedWidth="80px"
          >
            <Menu
              menuItemStyles={menuItemStyles}
              renderExpandIcon={({ open }) => (
                <Icon
                  className={cn(
                    'text-2xl duration-300',
                    open ? 'rotate-90' : ''
                  )}
                  icon={'material-symbols-light:chevron-right-rounded'}
                />
              )}
              closeOnClick
            >
              {menus.map(menu => (
                <Fragment key={menu.id}>
                  <div className="px-6 py-2">
                    <h2 className={cn(
                      'text-xs uppercase font-semibold text-slate-500',
                      isOpen ? 'block' : 'hidden'
                    )}>
                      {menu.title}
                    </h2>
                  </div>
                  {renderMenuItems(menu.children)}
                </Fragment>
              ))}
            </Menu>
          </Sidebar>
        ) : (
          <SidemenuItemLoader />
        )
      }
    </div>
  )
}