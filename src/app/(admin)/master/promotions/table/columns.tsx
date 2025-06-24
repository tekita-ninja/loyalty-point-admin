import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

import PermissionContainer from "@/components/permission-container";
import { FormPromotions } from "../form";
import FormDelete from "../form-delete";
import { TResponsePromotions } from "@/schema/master/promotions";
import { formatToDDMMYYYY } from "@/lib/utils";
import { DialogImageButton } from "../dialog/image";


export const columns: ColumnDef<TResponsePromotions>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'subtitle',
    header: 'Subtitle',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'start_date',
    header: 'Tanggal Mulai',
    cell: ({ row }) => {
        return (
            <div>
                {formatToDDMMYYYY(row.original.startDate)}
            </div>
        )
    }
  },
  {
    accessorKey: 'end_date',
    header: 'Tanggal Selesai',
    cell: ({ row }) => {
        return (
            <div>
                {formatToDDMMYYYY(row.original.endDate)}
            </div>
        )
    }
  },
  {
    accessorKey: 'isPush',
    header: 'Tampilkan',
    cell: ({ row }) => {
        return (
            <div>
                {row.original.isPush === 1 ? "Ya" : "Tidak"}
            </div>
        )
    }
  },
  {
    accessorKey: 'isPush',
    header: 'Banner',
    cell: ({ row }) => {
        return (
            <div>
                <DialogImageButton
                    urlPicture={row.original.urlPicture}
                    title={row.original.title}
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
          <PermissionContainer permission="PUT_promotion/:id">
            <FormPromotions data={row.original} />
          </PermissionContainer>
          <PermissionContainer permission="DELETE_promotion/:id">
            <FormDelete data={row.original} />
          </PermissionContainer>
        </div>
      )
    }
  }
]

