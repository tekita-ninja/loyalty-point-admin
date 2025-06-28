import { ColumnDef } from "@tanstack/react-table";

import PermissionContainer from "@/components/permission-container";
import FormDelete from "../form-delete";
import { TResponseRulePoint } from "@/schema/master/rule-point";
import { FormRulePoint } from "../form";
import { formatToDDMMYYYY } from "@/lib/utils";


export const columns: ColumnDef<TResponseRulePoint>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'multiplier',
    header: 'Multiplier',
  },
  {
    accessorKey: 'startDate',
    header: 'Start Date',
    cell: ({ row }) => {
        return (
            <div>
                {row.original.startDate ? formatToDDMMYYYY(row.original.startDate)   : "-"}
            </div>
        )
    }
  },
  {
    accessorKey: 'endDate',
    header: 'End Date',
    cell: ({ row }) => {
        return (
            <div>
                {row.original.endDate ? formatToDDMMYYYY(row.original.endDate)   : "-"}
            </div>
        )
    }

  },
   {
    accessorKey: 'isActive',
    header: 'Active',
    cell: ({ row }) => {
        return (
            <div>
                {row.original.isActive ? "Ya" : "Tidak"}
            </div>
        )
    }
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-end gap-1">
          <PermissionContainer permission="PUT_promotion/:id">
            <FormRulePoint data={row.original} />
          </PermissionContainer>
          <PermissionContainer permission="DELETE_promotion/:id">
            <FormDelete data={row.original} />
          </PermissionContainer>
        </div>
      )
    }
  }
]

