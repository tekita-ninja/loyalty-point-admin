'use client'
import DataTable from '@/components/datatable'
import { Card } from '@/components/ui/card'
import { useRouter, useSearchParams } from 'next/navigation'
import { columns } from './columns'
import { useMenu } from '@/hooks/menu/useMenu'

export default function Table() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pageSize = 10
  const { menus } = useMenu()

  async function onPageChange(e: number) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', String(e + 1))
    router.push(`?${params.toString()}`)
  }
  return (
    <Card className='p-4'>
      <DataTable
        data={menus.data?.data?.data ?? []}
        columns={columns}
        pageCount={menus.data?.data?.meta?.lastPage}
        pageIndex={menus.data?.data?.meta?.currentPage - 1 }
        pageSize={pageSize}
        onPageChange={onPageChange}
        isLoading={menus.isLoading}
      />
    </Card>
  )
}
