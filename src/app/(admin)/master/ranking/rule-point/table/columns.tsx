import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

import PermissionContainer from "@/components/permission-container";
import FormDelete from "../form-delete";
import { formatToDDMMYYYY } from "@/lib/utils";
import { TResponseRulePoint } from "@/schema/master/rule-point";
import { FormRulePoint } from "../form";


export const columns: ColumnDef<TResponseRulePoint>[] = [
  {
    accessorKey: 'multiplier',
    header: 'Multiplier',
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

