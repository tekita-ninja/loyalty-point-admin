'use client'

import { useProfile } from "@/hooks/profile/useProfile"
import { cn } from "@/lib/utils"
import useSideMenu from "@/store/useSideMenu"
import Image from "next/image"

export default function SidebarFooter() {
  const { isOpen } = useSideMenu()
  const { data } = useProfile()
  return (
    <div className="shrink-0 px-6 py-2">
      <div className={cn(
        // dark:from-primary/10 dark:to-primary/20 from-primary/90 to-primary/70
        "bg-gradient-to-tr  py-2 rounded-lg",
        "flex-1",
        isOpen ? 'block' : 'hidden'
      )}>
        <div className="flex gap-2">
          <div className="w-10 aspect-square shrink-0 bg-slate-100 rounded-full overflow-hidden">
            <Image width={512} height={512} className="w-full h-full" alt="user" src={'/user-dummy.png'} />
          </div>
          <div>
            <h2 className="font-semibold">{data?.fullname}</h2>
            <h2 className="text-xs font-semibold flex gap-2">
              {
                data?.roles.map(i => (
                  <span key={i} className="text-[10px] bg-black/10 uppercase rounded px-2">{i}</span>
                ))
              }
            </h2>
          </div>
        </div>
      </div>
      <div className="text-start py-1 px-2 font-bold text-[11px] mt-1">
        Version: 1.0.0
      </div>
    </div>
  )
}
