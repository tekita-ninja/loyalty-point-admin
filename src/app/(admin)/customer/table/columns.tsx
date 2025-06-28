import { ColumnDef } from "@tanstack/react-table";

import { TResponseCustomer } from "@/schema/customer";


export const columns: ColumnDef<TResponseCustomer>[] = [
  {
    accessorKey: 'firstname',
    header: 'First Name',
  },
  {
    accessorKey: 'lastname',
    header: 'Last Name',
  },
  {
    accessorKey: 'email',
    header: 'email',
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
  },
  {
    accessorKey: 'ranking.name',
    header: 'Ranking',
  },
  {
    accessorKey: 'ranking.rulePoint.multiplier',
    header: 'Multiplier Point',
  },
  {
    accessorKey: 'totalPoint',
    header: 'Total Point',
    cell: ({ row }) => {
      return (
        <div>
          {row.original.totalPoint.toLocaleString('id-ID')}
        </div>
      )
    }
  },
  // {
  //   id: "actions",
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     return (
  //       <div className="flex items-center gap-2">
  //         Detail
  //       </div>
  //     )
  //   }
  // }
]

