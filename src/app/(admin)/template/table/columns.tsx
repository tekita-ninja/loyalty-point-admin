import { ColumnDef } from "@tanstack/react-table";
import { TWallet } from "./table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import FormTemplate from "./form";
import { FormDelete } from "./form-delete";

export const columns: ColumnDef<TWallet>[] = [
  {
    accessorKey: 'wallet',
    header: 'Wallet',
    cell: ({ row }) => {
      return <div className="font-medium">
        {row.original.wallet}
      </div>
    },
  },
  {
    accessorKey: 'balance',
    header: 'Balance',
    cell: ({ row }) => {
      return (<Badge variant={'destructive'}>{row.original.balance}</Badge>)
    }
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => {
      return (
        <div className="flex gap-1">
          <Badge variant={'warning'}>{row.original.price}</Badge>
          <Badge variant={'danger'}>{row.original.price}</Badge>
          <Badge variant={'success'}>{row.original.price}</Badge>
        </div>
      )
    }
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size={'icon'}>
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <FormTemplate id={row.original.id} data={row.original} />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <FormDelete id={row.original.id} data={row.original} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
]

