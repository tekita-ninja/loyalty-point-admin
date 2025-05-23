import { TResponsePermission } from "@/schema/permission";
import { ColumnDef } from "@tanstack/react-table";
import { FormAction } from "../form";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import FormDelete from "../form-delete";
import PermissionContainer from "@/components/permission-container";

export const columns: ColumnDef<TResponsePermission>[] = [
  {
    accessorKey: 'path',
    header: 'Path',
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 font-semibold">
          {
            row.original.name
          }
        </div>
      )
    }
  },
  {
    accessorKey: 'method',
    header: 'Method',
    cell: ({ row }) => {
      return (
        <Badge className={cn(
          'rounded-sm',
          row.original.method === 'GET' && 'bg-green-500',
          row.original.method === 'POST' && 'bg-orange-500',
          row.original.method === 'DELETE' && 'bg-red-500',
          row.original.method === 'PATCH' && 'bg-violet-500',
          row.original.method === 'PUT' && 'bg-blue-500',
        )}>{row.original.method}</Badge>
      )
    }
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-end gap-1">
          <PermissionContainer permission="PATCH_permissions/:id">
            <FormAction data={row.original} />
          </PermissionContainer>
          <PermissionContainer permission="DELETE_permissions/:id">
            <FormDelete data={row.original} />
          </PermissionContainer>
        </div>
      )
    }
  }
]

