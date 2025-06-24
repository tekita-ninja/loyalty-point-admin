import { ColumnDef } from "@tanstack/react-table";

import PermissionContainer from "@/components/permission-container";
import FormDelete from "../form-delete";
import { TResponseCategory } from "@/schema/master/category";
import { FormCategory } from "../form";

export const columns: ColumnDef<TResponseCategory>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-end gap-1">
          <PermissionContainer permission="PUT_category/:id">
            <FormCategory data={row.original} />
          </PermissionContainer>
          <PermissionContainer permission="DELETE_category/:id">
            <FormDelete data={row.original} />
          </PermissionContainer>
        </div>
      )
    }
  }
]

