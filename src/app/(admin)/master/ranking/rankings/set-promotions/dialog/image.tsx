import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function DialogImageButton({ urlPicture, name } : { urlPicture: string, name: string }) {
  return (
    <div className="cursor-pointer mx-h rounded flex items-center justify-center my-5">
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                        <img src={urlPicture} alt={name} className="object-cover max-h-24 rounded" />
                </TooltipTrigger>
                <TooltipContent>
                    <p>Open image</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    </div>
  )
}
