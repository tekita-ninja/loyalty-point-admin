import { Button } from '@/components/ui/button'
import React from 'react'
import { RiCloseLargeLine, RiMenu2Fill } from 'react-icons/ri'

export default function BtnMenuMobile({ isHidden, setIsHidden }: { isHidden: boolean, setIsHidden:()=>void }) {
  return (
    <>
      {
        !isHidden ? (
          <Button asChild className='md:hidden' size={"icon"} variant={'outline'}>
            <div><RiCloseLargeLine /></div>
          </Button>
        ) : (
          <Button onClick={setIsHidden} className='md:hidden' size={"icon"} variant={'outline'}>
            <RiMenu2Fill />
          </Button>
        )
      }
    </>
  )
}
