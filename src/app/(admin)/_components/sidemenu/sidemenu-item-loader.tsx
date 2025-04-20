import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'
type SidemenuItemLoaderProp = {
  count?: number
}
export default function SidemenuItemLoader(props: SidemenuItemLoaderProp) {
  const result = Array(props.count || 11).fill(0).map((_, i) => i + 1);
  return (
    <div className='px-5 space-y-4 mt-5'>
      {
        result.map(i => (
          <div key={i} className='flex items-center gap-2'>
            <Skeleton className="h-9 w-9 rounded-full" />
            <div className="space-y-1 flex-1">
              <Skeleton className="h-8 w-full rounded-full" />
            </div>
          </div>
        ))
      }
    </div>
  )
}
