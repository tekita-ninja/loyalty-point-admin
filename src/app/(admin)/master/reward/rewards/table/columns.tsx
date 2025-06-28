import { ColumnDef } from "@tanstack/react-table";

import PermissionContainer from "@/components/permission-container";
import FormDelete from "../form-delete";
import { FormReward } from "../form";
import { TResponseReward } from "@/schema/master/reward";
import { formatToDDMMYYYY } from "@/lib/utils";
import { DialogImageButton } from "../Dialog/image";

export const columns: ColumnDef<TResponseReward>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'category.name',
    header: 'Category',
  },
  {
    accessorKey: 'stocks',
    header: 'Stocks',
    cell: ({ row }) => {
        const stocks = row.original.stocks;
        return (
            <span className="text-right">
            {stocks ? stocks.toLocaleString('id-ID') : '-'}
            </span>
        )
    }
  },
  {
    accessorKey: 'price',
    header: 'Point',
    cell: ({ row }) => {
        const price = row.original.price;
        return (
            <span className="text-right">
            {price ? price.toLocaleString('id-ID') : '-'}
            </span>
        )
    }
  },
  {
    accessorKey: 'startDate',
    header: 'Start Date',
    cell: ({ row }) => {
        return (
            <div>
                {formatToDDMMYYYY(row.original.startDate)}
            </div>
        )
    }
  },
  {
    accessorKey: 'endDate',
    header: 'End Date',
    cell: ({ row }) => {
        return (
            <div>
                {formatToDDMMYYYY(row.original.endDate)}
            </div>
        )
    }
  },
  {
    accessorKey: 'isLimited',
    header: 'Limited',
    cell: ({ row }) => {
        return (
            <div>
                {row.original.isLimited ? "Ya" : "Tidak"}
            </div>
        )
    }
  },
  {
      accessorKey: 'urlPicture',
      header: 'Image',
      cell: ({ row }) => {
          return (
              <div>
                  <DialogImageButton
                      urlPicture={row.original.urlPicture}
                      name={row.original.name}
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
          <PermissionContainer permission="PUT_reward/:id">
            <FormReward data={row.original} />
          </PermissionContainer>
          <PermissionContainer permission="DELETE_reward/:id">
            <FormDelete data={row.original} />
          </PermissionContainer>
        </div>
      )
    }
  }
]

