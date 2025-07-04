'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Image from "next/image"

export function DialogImageButton({ urlPicture, name } : { urlPicture: string, name: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Picture</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Image</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-2 cursor-pointer">
          
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Image
                        src={urlPicture}
                        alt={name}
                        width={800}
                        height={800}
                        className="object-cover rounded"
                        onClick={() => window.open(urlPicture, '_blank')}
                    />
                </TooltipTrigger>
                <TooltipContent>
                    <p>Open image</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
        
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
