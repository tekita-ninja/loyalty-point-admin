'use client'
import useSideMenu from '@/store/useSideMenu'
import React from 'react'
import { BsWindowSidebar } from 'react-icons/bs'

export default function BtnCollapseMenu() {
  const { setIsOpen } = useSideMenu()
  return (
    <button onClick={setIsOpen} className='w-7 h-7 bg-[#0B99FF]/10 shrink-0 rounded-md flex items-center justify-center'>
      <BsWindowSidebar />
    </button>
  )
}
