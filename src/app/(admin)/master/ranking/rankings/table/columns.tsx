import { ColumnDef } from "@tanstack/react-table";
import { TResponseRanking } from "@/schema/master/ranking";
import { FormRanking } from "../form";
import FormDelete from "../form-delete";
import PermissionContainer from "@/components/permission-container";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export const columns: ColumnDef<TResponseRanking>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
   {
    accessorKey: 'minSpending',
    header: 'Min. Spending',
    cell: ({ row }) => {
        return (
            <div>
                {row.original.minSpendings.toLocaleString('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                })}
            </div>
        )
    }
  },
  {
    accessorKey: 'minPoints',
    header: 'Min. Points',
    cell: ({ row }) => {
        return (
            <div>
                { row.original.minPoints }
            </div>
        )
    }
  },
  {
    accessorKey: 'rulePoint.multiplier',
    header: 'Multiplier Points'
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-end gap-1">
          <PermissionContainer permission='POST_ranking/assign-promotion'>
            <Button size={'sm'} asChild>
              <Link href={`/master/ranking/rankings/set-promotions?rankingId=${row.original.id}`}>Sign Promotions</Link>
            </Button>
          </PermissionContainer>
          <PermissionContainer permission='POST_ranking/assign-benefit'>
            <Button size={'sm'} asChild>
              <Link href={`/master/ranking/rankings/set-benefits?rankingId=${row.original.id}`}>Sign Benefit</Link>
            </Button>
          </PermissionContainer>
          <PermissionContainer permission="PUT_ranking/:id">
            <FormRanking data={row.original} />
          </PermissionContainer>
          <PermissionContainer permission="DELETE_ranking/:id">
            <FormDelete data={row.original} />
          </PermissionContainer>
        </div>
      )
    }
  }
]

