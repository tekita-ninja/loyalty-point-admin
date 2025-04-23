'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useUpdateSearchParams } from '@/lib/updateSearchParams'
import { useSearchParams } from 'next/navigation'

const pageSizes = [10, 20, 50, 100]

export function PageSizeSelector() {
  const searchParams = useSearchParams()
  const pageSizeFromUrl = searchParams.get('pageSize') || '10'
  const updateParams = useUpdateSearchParams()

  return (
    <div className='flex gap-2 items-center w-full'>
      <p className='text-sm'>Row Per Page</p>
      <Select
        defaultValue={pageSizeFromUrl}
        onValueChange={(value) => {
          updateParams({ pageSize: value, page: 1 })
        }}
      >
        <SelectTrigger className='w-20'>
          <SelectValue placeholder="Per page" />
        </SelectTrigger>
        <SelectContent>
          {pageSizes.map((size) => (
            <SelectItem key={size} value={String(size)}>
              {size}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
