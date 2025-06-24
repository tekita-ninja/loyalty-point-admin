import { ColumnDef } from "@tanstack/react-table";

import PermissionContainer from "@/components/permission-container";
import FormDelete from "../form-delete";
import { TResponseCategory } from "@/schema/master/category";
import { FormLocation } from "../form";
import { TResponseLocation } from "@/schema/master/location";

export const columns: ColumnDef<TResponseLocation>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
  {
    accessorKey: 'latitude',
    header: 'Latitude',
  },
  {
    accessorKey: 'longitude',
    header: 'Longitude',
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-end gap-1">
          <PermissionContainer permission="PUT_category/:id">
            <FormLocation data={row.original} />
          </PermissionContainer>
          <PermissionContainer permission="DELETE_category/:id">
            <FormDelete data={row.original} />
          </PermissionContainer>
        </div>
      )
    }
  }
]

