'use client'
import { ModeToggle } from '@/components/mode-toggle'
import useSideMenu from '@/store/useSideMenu'
import BtnCollapseMenu from './btn-collapse-menu'
import BtnMenuMobile from './btn-menu-mobile'
import DropdownMenuAdmin from './dropdown-menu-admin'
import Breadcrumb from './breadcrumb'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  const labelName = pathname.split("/")[1]
  const { setIsHidden, isHidden } = useSideMenu()
  return (
    <div className='h-[100px sticky top-0 z-10'>
      <div className='h-[70px] bg-white dark:bg-primary-foreground'>
        <div className="flex items-center h-full container">
          <div className='flex-1 flex items-center gap-2'>
            <BtnCollapseMenu />
            <div>
              <h2 className='font-semibold text-xl capitalize'>{labelName || 'Dashboard' }</h2>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <DropdownMenuAdmin />
            <ModeToggle />
            <BtnMenuMobile setIsHidden={setIsHidden} isHidden={isHidden} />
          </div>
        </div>
      </div>
      <Breadcrumb />
    </div>
  )
}
