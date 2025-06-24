import { ColumnDef } from "@tanstack/react-table";
import { TResponseRanking } from "@/schema/master/ranking";
import { FormRanking } from "../form";
import FormDelete from "../form-delete";
import PermissionContainer from "@/components/permission-container";


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

