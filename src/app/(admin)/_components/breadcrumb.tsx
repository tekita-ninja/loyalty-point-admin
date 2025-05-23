'use client'
import { Home } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { Fragment } from 'react'
export default function Breadcrumb() {
  const pathname = usePathname()
  const paths = pathname.split('/').filter(i => i !== "")
  return (
    <div className='bg-white dark:bg-primary-foreground hidden md:block'>
      <div className="container">
        <div className='flex text-sm items-center gap-x-2 h-[30px]'>
          {
            paths.length > 0 ? (
              <Link href={`/`} className='capitalize text-primary font-semibold flex items-center gap-x-1'>
                <Home className='w-4 h-4' />
                Dashboard /</Link>
            ) : (
              <div className='text-slate-500 flex items-center gap-x-1'>
                <Home className='w-4 h-4' />
                Dashboard</div>
            )
          }

          {paths.map((path, index) => (
            <Fragment key={index}>
              {index > 0 && <div>/</div>}
              {
                index + 1 < paths.length ? (
                  <Link href={`/${path}`} className='capitalize font-semibold text-primary'>{path}</Link>
                ) : (
                  <div className='text-slate-600 text-sm'>{path}</div>
                )
              }
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}
