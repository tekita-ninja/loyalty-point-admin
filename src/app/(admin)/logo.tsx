'use client'
import { cn } from '@/lib/utils'
import useSideMenu from '@/store/useSideMenu'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
type LogoProp = {
  src?: string
  text?: string
  noText?: boolean
  logoSize?:string
}
export default function Logo(props: LogoProp) {
  const [mounted, setMounted] = useState(false)
  const { isOpen } = useSideMenu()
  const { theme } = useTheme()
  useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) return null
  return (
    <Link href={'/'} className='flex gap-2 items-center'>
      {
        theme === 'dark' && <Image className={cn('h-8 w-8',props.logoSize)} width={512} height={512} src={props.src || '/logo/logo-white.png'} alt='GNS LOGO' />
      }
      {
        theme === 'light' && <Image className={cn('h-8 w-8',props.logoSize)} width={512} height={512} src={props.src || '/logo/logo-black.png'} alt='GNS LOGO' />
      }

      {
        isOpen && !props.noText && <p className='font-bold text-xl hidden md:flex'>{props.text || 'GENEURASYS'}</p>
      }
    </Link>
  )
}
