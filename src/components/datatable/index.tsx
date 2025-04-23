'use client'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table'
interface DataTableProps<TData> {
  data: TData[]
  columns: ColumnDef<TData>[]
  pageCount: number
  pageIndex: number
  pageSize: number
  onPageChange: (pageIndex: number) => void
  isLoading?: boolean
}

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink
} from "@/components/ui/pagination"
import { ChevronLeft, ChevronRight, LucideSettings2 } from "lucide-react"
import { useState } from 'react'
import TableLoader from './loader'
import { PageSizeSelector } from './page-size-selector'
import { SearchForm } from './search-form'

export default function DataTable<TData>({
  data,
  columns,
  pageCount,
  pageIndex,
  pageSize,
  onPageChange,
  isLoading
}: DataTableProps<TData>) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const table = useReactTable({
    data,
    columns,
    pageCount,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
      columnVisibility,
    },
    manualPagination: true,
    onPaginationChange: (updater) => {
      const newState = typeof updater === 'function' ? updater({ pageIndex, pageSize }) : updater
      onPageChange(newState.pageIndex)
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const DOTS = '...'

  function getPaginationRange(current: number, total: number, siblingCount = 1): (number | string)[] {
    const totalPageNumbers = siblingCount * 2 + 5 // includes first, last, current, 2 DOTS
    if (total <= totalPageNumbers) {
      return Array.from({ length: total }, (_, i) => i)
    }

    const leftSiblingIndex = Math.max(current - siblingCount, 1)
    const rightSiblingIndex = Math.min(current + siblingCount, total - 2)

    const showLeftDots = leftSiblingIndex > 1
    const showRightDots = rightSiblingIndex < total - 2

    const pagination: (number | string)[] = []

    pagination.push(0)

    if (showLeftDots) {
      pagination.push(DOTS)
    }

    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      pagination.push(i)
    }

    if (showRightDots) {
      pagination.push(DOTS)
    }

    pagination.push(total - 1)

    return pagination
  }
  
  return (
    <>
      {isLoading ? <TableLoader /> : (
        <div>
          <div className='w-full mb-2 flex justify-end gap-2'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <LucideSettings2 />
                  View
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter(
                    (column) => column.getCanHide()
                  )
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
            <SearchForm placeholder="Search..." paramKey="search" />
          </div>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <TableHead key={header.id}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map(row => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className='flex justify-between pt-3'>
            <PageSizeSelector />
            <Pagination className='justify-end items-center'>
              <PaginationContent>
                <PaginationItem>
                  <Button
                    variant={'outline'}
                    size={'icon'}
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    <ChevronLeft />
                  </Button>
                </PaginationItem>
                <div className='hidden md:flex'>
                  {getPaginationRange(table.getState().pagination.pageIndex, table.getPageCount()).map((page, idx) => (
                    <PaginationItem key={idx}>
                      {page === DOTS ? (
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                      ) : (
                        <PaginationLink
                          href="#"
                          isActive={table.getState().pagination.pageIndex === page}
                          onClick={(e) => {
                            e.preventDefault()
                            table.setPageIndex(+page)
                          }}
                        >
                          {Number(page) + 1}
                        </PaginationLink>
                      )}
                    </PaginationItem>
                  ))}
                </div>
                <PaginationItem>
                  <Button
                    variant={'outline'}
                    size={'icon'}
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    <ChevronRight />
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>

      )}
    </>
  )
}
