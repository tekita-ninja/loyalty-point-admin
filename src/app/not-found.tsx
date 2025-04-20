import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <div className='h-screen flex items-center justify-center bg-white'>
      <div className='absolute left-0 right-0 top-0 bottom-0 z-0'>
        <Image alt='404' src={'/images/sky.png'} fill className='w-full h-full object-cover' />
      </div>
      <div className='absolute left-0 right-0 top-0 bottom-0 z-10 bg-gradient-to-r from-black/90 via-transparent to-black/90 flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-black text-7xl font-extrabold'>404</h1>
          <p className='text-black text-xl lg:text-3xl'>PAGE NOT FOUND</p>
          <Button variant={'secondary'} size={'lg'} className='rounded-full mt-4' asChild>
            <Link href={'/'}>Back to home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
