import { TResponseMenu } from "@/schema/menu";
import { Icon } from '@iconify/react';
import { ColumnDef } from "@tanstack/react-table";
import { FormMenu } from "../form";
import { SignRole } from "../sign-role";
import FormDelete from "../form-delete";
import PermissionContainer from "@/components/permission-container";

export const columns: ColumnDef<TResponseMenu>[] = [
  {
    accessorKey: 'parent.title',
    header: 'Parent Menu',
    cell: ({ row }) => {
      return (<div>{row.original.parent?.title || "-"} </div>)
    }
  },
  {
    accessorKey: 'title',
    header: 'Menu',
    cell: ({ row }) => {
      return <div className="font-medium flex items-center gap-2">
        {row.original.icon ? <Icon icon={row.original.icon} /> : <div className="w-4"></div>}
        {row.original.title}
      </div>
    },
  },
  {
    accessorKey: 'path',
    header: 'Path',
    cell: ({ row }) => {
      return (<div>{row.original.path}</div>)
    }
  },
  {
    accessorKey: 'order',
    header: 'Order',
  },
  {
    accessorKey: 'isGroup',
    header: 'Group Menu',
    cell: ({ row }) => {
      return !row.original.isGroup ? <Icon className="text-xl text-destructive" icon={'uil:times'} /> : <Icon className="text-xl" icon={'material-symbols:check-rounded'} />
    }
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-end gap-1">
          <PermissionContainer permission="PATCH_menus/:id">
            <FormMenu data={row.original} />
          </PermissionContainer>
          <PermissionContainer permission="DELETE_menus/:id">
            <FormDelete data={row.original} />
          </PermissionContainer>
          <PermissionContainer permission="POST_menus/set-role">
            <SignRole data={row.original} />
          </PermissionContainer>
        </div>
      )
    }
  }
]

