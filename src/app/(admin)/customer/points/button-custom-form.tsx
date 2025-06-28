'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { RiAddLine } from "react-icons/ri";

export default function ButtonFormCustomPoint() {
    const router = useRouter();
  return (
    <div className='flex justify-end'>
        <Button className="w-full flex justify-start items-center"  onClick={() => router.push('points/custom-form')}> <RiAddLine /> Custom Point</Button>
    </div>
  )
}