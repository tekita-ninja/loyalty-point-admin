import { TResponseRole } from "@/schema/role";
import { ColumnDef } from "@tanstack/react-table";
import { FormAction } from "../form";
import FormDelete from "../form-delete";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PermissionContainer from "@/components/permission-container";

export const columns: ColumnDef<TResponseRole>[] = [
  {
    accessorKey: 'code',
    header: 'Code',
  },
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
          <PermissionContainer permission='GET_roles/all'>
            <Button size={'sm'} asChild>
              <Link href={`/roles/set-permission?roleId=${row.original.id}`}>Sign Permissions</Link>
            </Button>
          </PermissionContainer>
          <PermissionContainer permission='GET_roles/all'>
            <Button size={'sm'} asChild>
              <Link href={`/roles/set-menu?roleId=${row.original.id}`}>Sign Menu</Link>
            </Button>
          </PermissionContainer>
          <PermissionContainer permission='PATCH_roles/:id'>
            <FormAction data={row.original} />
          </PermissionContainer>
          <PermissionContainer permission='DELETE_roles/:id'>
            <FormDelete data={row.original} />
          </PermissionContainer>
        </div>
      )
    }
  }
]

