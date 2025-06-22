'use client'
import DataTable from '@/components/datatable'
import { Card } from '@/components/ui/card'
import { useUser } from '@/hooks/user/useUser'
import { useRouter, useSearchParams } from 'next/navigation'
import { columns } from './columns'

export default function Table() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pageSize = 10
  const { lists } = useUser()

  async function onPageChange(e: number) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', String(e + 1))
    router.push(`?${params.toString()}`)
  }
  return (
    <Card className='p-4'>
      <DataTable
        data={lists.data?.data ?? []}
        columns={columns}
        pageCount={lists.data?.meta?.lastPage}
        pageIndex={lists.data?.meta?.currentPage - 1 }
        pageSize={pageSize}
        onPageChange={onPageChange}
        isLoading={lists.isLoading}
      />
    </Card>
  )
}
