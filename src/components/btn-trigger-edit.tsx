import React from 'react'
import { Button } from './ui/button'
import { RiPencilLine } from 'react-icons/ri'

export default function BtnTriggerEdit() {
  return (
    <Button variant={'table'}><RiPencilLine /> Edit</Button>
  )
}
