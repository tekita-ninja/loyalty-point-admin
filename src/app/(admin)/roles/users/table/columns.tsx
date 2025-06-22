import { TResponseUser } from "@/schema/user";
import { ColumnDef } from "@tanstack/react-table";
import FormDelete from "../form-delete";
import { FormAction } from "../form";
import { SignRole } from "../sign-role";
import PermissionContainer from "@/components/permission-container";

export const columns: ColumnDef<TResponseUser>[] = [
  {
    accessorKey: 'firstname',
    header: 'Firstname',
  },
  {
    accessorKey: 'lastname',
    header: 'Lastname',
  },
  {
    accessorKey: 'email',
    header: 'Email/Username',
  },
  {
    accessorKey: 'roles',
    header: 'Role',
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 font-semibold">
          {
            row.original.roles.map(item => (
              <div key={item.id}>{`[${item.role.name}]`}</div>
            ))
          }
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
          <PermissionContainer permission='PATCH_roles/:id'>
            <FormAction data={row.original} />
          </PermissionContainer>
          <PermissionContainer permission='DELETE_roles/:id'>
            <FormDelete data={row.original} />
          </PermissionContainer>
          <PermissionContainer permission='POST_users/set-role'>
            <SignRole data={row.original} />
          </PermissionContainer>
        </div>
      )
    }
  }
]

