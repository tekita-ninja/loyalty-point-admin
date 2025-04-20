'use client'

import { cn } from "@/lib/utils"
import useSideMenu from "@/store/useSideMenu"
import Image from "next/image"

export default function SidebarFooter() {
  const { isOpen } = useSideMenu()
  return (
    <div className="shrink-0 px-6 py-2">
      <div className={cn(
        "bg-gradient-to-tr dark:from-primary/10 dark:to-primary/20 from-primary/90 to-primary/70 p-4 rounded-lg",
        "flex-1 text-white",
        isOpen ? 'block' : 'hidden'
      )}>
        <div className="flex gap-2">
          <div className="w-10 aspect-square shrink-0 bg-slate-100 rounded-full overflow-hidden">
            <Image width={512} height={512} className="w-full h-full" alt="user" src={'/user-dummy.png'} />
          </div>
          <div>
            <h2 className="font-semibold">Jhon Paul Ivan</h2>
            <h2 className="text-xs font-semibold">Super Admin</h2>
          </div>
        </div>
      </div>
      {/* <div className="text-center text-[11px] mt-2">
        Version: 1.0.0
      </div> */}
    </div>
  )
}
