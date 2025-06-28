"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { RiAddLine } from "react-icons/ri";

export default function ButtonForm() {
    const router = useRouter();
  return (
    <div>
        <Button className="w-full flex justify-start items-center"  onClick={() => router.push('points/form')}> <RiAddLine /> Add Point</Button>
    </div>
  )
}