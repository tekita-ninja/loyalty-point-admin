import { ColumnDef } from "@tanstack/react-table";

import PermissionContainer from "@/components/permission-container";
import { TResponseBenefit } from "@/schema/master/benefit";
import { FormBenefit } from "../form";
import FormDelete from "../form-delete";
import { DialogImageButton } from "../dialog/image";

export const columns: ColumnDef<TResponseBenefit>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
        accessorKey: 'urlPicture',
        header: 'Image Icon',
        cell: ({ row }) => {
            return (
                <div>
                    <DialogImageButton
                        urlPicture={row.original.urlPicture}
                        name={row.original.title}
                    />
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
          <PermissionContainer permission="PUT_benefit/:id">
            <FormBenefit data={row.original} />
          </PermissionContainer>
          <PermissionContainer permission="DELETE_benefit/:id">
            <FormDelete data={row.original} />
          </PermissionContainer>
        </div>
      )
    }
  }
]

