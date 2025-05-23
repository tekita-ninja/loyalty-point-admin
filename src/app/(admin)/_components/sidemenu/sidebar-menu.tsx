'use client'
import useSideMenu from '@/store/useSideMenu';
import React, { Fragment, useEffect, useState } from 'react'
import { Sidebar, Menu, MenuItem, SubMenu, menuClasses, MenuItemStyles } from 'react-pro-sidebar';
import { Icon } from "@iconify/react";
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SidemenuItemLoader from './sidemenu-item-loader';
import { useSidemenu } from '@/hooks/sidemenu/useSidemenu';
export default function SidebarMenu() {
  const menus = useSidemenu()
  const { resolvedTheme } = useTheme()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const { isOpen } = useSideMenu()
  const mainPath = pathname.split("/")[1];
  useEffect(() => {
    setMounted(true)
  }, [])
  const isDark = resolvedTheme === 'dark'

  const themes = {
    light: {
      sidebar: {
        backgroundColor: 'transparent',
        color: '#0F172A',
      },
      menu: {
        menuContent: '#fff',
        icon: isDark ? '#FFF' : '#000',
        hover: {
          backgroundColor: '#c5e4ff',
          color: '#44596e',
        },
        disabled: {
          color: '#9fb6cf',
        },
      },
    },
    dark: {
      sidebar: {
        backgroundColor: '#0b2948',
        color: '#FFF',
      },
      menu: {
        menuContent: '#F00',
        icon: '#FFF',
        hover: {
          backgroundColor: '#DFF1FF',
          color: '#b6c8d9',
        },
        disabled: {
          color: '#3e5e7e',
        },
      },
    },
  };
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
    // { level }
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
  };

  return (
    <div className='flex-1 no-sroll-thumb overflow-y-auto'>
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
            collapsed={!isOpen} collapsedWidth="80px">
            <Menu
              menuItemStyles={menuItemStyles}
              renderExpandIcon={({ open }) => (
                <Icon className={
                  cn(
                    'text-2xl duration-300',
                    open ? 'rotate-90' : ''
                  )
                } icon={'material-symbols-light:chevron-right-rounded'} />
              )}
              closeOnClick
            >
              {
                menus.map(menu => (
                  <Fragment key={menu.id}>
                    <div className='px-6 py-2'>
                      <h2 className={cn(
                        'text-xs uppercase font-semibold text-slate-500',
                        isOpen ? 'block' : 'hidden'
                      )}>{menu.title}</h2>
                    </div>
                    {
                      menu.children.length > 0 ? (
                        <Fragment>
                          {
                            menu.children.map(menuItem => (
                              <Fragment key={menuItem.id}>
                                {
                                  menuItem.children.length > 0 ? (
                                    <SubMenu defaultOpen={menuItem.path == `${mainPath}` } icon={<Icon className='h-4 w-4' icon={menuItem.icon || ''} />} label={menuItem.title}>
                                      {
                                        menuItem.children.map((subMenuItem, indexItem) => (
                                          <MenuItem active={subMenuItem.path === pathname} component={<Link href={subMenuItem.path || '#'} />} key={indexItem}>
                                            {subMenuItem.title}
                                          </MenuItem>
                                        ))
                                      }
                                    </SubMenu>
                                  ) : (
                                      <MenuItem component={<Link href={menuItem.path || '/'} />} active={menuItem.path === pathname} icon={<Icon className='h-4 w-4' icon={menuItem.icon || ''} />}> {menuItem.title}</MenuItem>
                                  )
                                }
                              </Fragment>
                            ))
                          }
                        </Fragment>
                      ) : (
                        <MenuItem component={<Link href={menu.path || '/'} />} active={menu.path === pathname} icon={<Icon className='h-4 w-4' icon={menu.icon || ''} />}> {menu.title}</MenuItem>
                      )
                    }
                  </Fragment>
                ))
              }
            </Menu>
          </Sidebar>
        ) : (
          <SidemenuItemLoader />
        )
      }
    </div>
  )
}
