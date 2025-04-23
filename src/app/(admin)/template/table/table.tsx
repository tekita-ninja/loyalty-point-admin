'use client'
import DataTable from '@/components/datatable'
import { Card } from '@/components/ui/card'
import { useWallet } from '@/hooks/wallet/useWallet'
import { useRouter, useSearchParams } from 'next/navigation'
import { columns } from './columns'
export type TWallet = {
  id: number
  wallet: string
  balance: string
  price: string
}

export default function Table() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pageSize = 10
  const { data, isLoading } = useWallet()

  async function onPageChange(e: number) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', String(e + 1))
    router.push(`?${params.toString()}`)
  }

  return (
    <Card className='p-4'>
      <DataTable
        data={data?.data?.data ?? []}
        columns={columns}
        pageCount={data?.data?.total_pages}
        pageIndex={data?.data?.page - 1}
        pageSize={pageSize}
        onPageChange={onPageChange}
        isLoading={isLoading}
      />
    </Card>
  )
}
