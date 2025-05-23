'use client'
import { cn } from '@/lib/utils'
import useSideMenu from '@/store/useSideMenu'
import { useRef } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import SidebarFooter from './sidebar-footer'
import SidebarHeader from './sidebar-header'
import SidebarMenu from './sidebar-menu'
export default function SideMenu() {
  const ref = useRef(null)
  const { isOpen, isHidden, setIsHidden } = useSideMenu()
  function clickOutSide() {
    if (!isHidden) {
      setIsHidden()
    }
  }
  useOnClickOutside(ref, clickOutSide)
  return (
    <aside ref={ref} className={cn(
      'bg-white dark:bg-primary-foreground top-0 h-screen duration-300',
      isOpen ? 'w-[260px] md:w-[260px]' : 'w-[80px]',
      'fixed md:sticky z-20',
      isHidden ? '-translate-x-full md:-translate-x-0' : '-translate-x-0'
    )}>
      <div className="flex flex-col h-full">
        <SidebarHeader />
        <SidebarMenu />
        <SidebarFooter />
      </div>
    </aside>
  )
}
