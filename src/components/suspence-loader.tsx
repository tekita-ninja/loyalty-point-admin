'use client'

import { AiOutlineLoading3Quarters } from "react-icons/ai"

export default function SuspenceLoader() {
  return (
    <div className='fixed left-0 right-0 top-0 bottom-0 bg-primary-foreground/5 z-30 flex items-start justify-center p-3 backdrop-blur-[1px]'>
      <div className='bg-slate-950/90 flex items-center gap-2 px-2 py-1.5 rounded-full text-white dark:bg-white dark:text-black'>
        <AiOutlineLoading3Quarters className='animate-spin' />
        <p className='text-xs uppercase font-semibold'>Loading...</p>
      </div>
    </div>
  )
}
