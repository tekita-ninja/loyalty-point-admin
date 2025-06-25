import { ColumnDef } from "@tanstack/react-table";

import PermissionContainer from "@/components/permission-container";
import FormDelete from "../form-delete";
import { FormLocation } from "../form";
import { TResponseLocation } from "@/schema/master/location";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
          <PermissionContainer permission="POST_location/assign-reward">
             <Button size={'sm'} asChild>
              <Link href={`/master/reward/location/set-rewards?locationId=${row.original.id}`}>Sign Rewards</Link>
            </Button>
          </PermissionContainer>
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

