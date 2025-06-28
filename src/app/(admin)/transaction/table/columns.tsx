import { ColumnDef } from "@tanstack/react-table";

import { EnumStatusTransaction, EnumStatusTransactionLabel } from "@/types/enum";
import { formatToDDMMYYYY } from "@/lib/utils";
import { TResponseTransaction } from "@/schema/transaction";
export const columns: ColumnDef<TResponseTransaction>[] = [
    {
        accessorKey: 'user',
        header: 'Customer Info',
        cell: ({ row }) => {
            const user = row.original.user;
            return (
                <div className="flex flex-col">
                    <span className="font-semibold">{user.firstname} {user.lastname}</span>
                    <span className="text-sm text-gray-500">{user.email}</span>
                    <span className="text-sm text-gray-500">{user.phone}</span>
                </div>
            )
        }
    },
    {
        accessorKey: 'location',
        header: 'Location',
        cell: ({ row }) => {
            const location = row.original.location;
            return (
                <div className="flex flex-col">
                    <span className="font-semibold">{location.name}</span>
                    <span className="text-sm text-gray-500">{location.address}</span>
                </div>
            )
        }
    },
    {
        accessorKey: 'reward',
        header: 'Reward',
        cell: ({ row }) => {
            const reward = row.original.reward;
            return (
                <div className="flex flex-col">
                    <span className="font-semibold">{reward.name}</span>
                    <span className="text-sm text-gray-500">{reward.category.name}</span>
                    <span className="text-sm text-gray-500">{reward.price.toLocaleString('id-ID')}</span>
                </div>
            )
        }
    },
    {
        accessorKey: 'cutpoint',
        header: 'Cut Point',
        cell: ({ row }) => {
            const cutpoint = row.original.cutPoint;
            return (
                <div className="flex flex-col">
                    <span className="font-semibold">{cutpoint.toLocaleString('id-ID')}</span>
                </div>
            )
        }
    },
    {
        accessorKey: 'note',
        header: 'Notes',
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const status = row.original.status;
            return (
                <span className={`px-2 py-1 rounded-full text-xs ${status === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    { EnumStatusTransactionLabel[status as EnumStatusTransaction] }
                </span>
            )
        }
    },
    {
        accessorKey: 'expired',
        header: 'Expired',
        cell: ({ row }) => {
            const expired = row.original.expired;
            return (
                <span className={`px-2 py-1 rounded-full text-xs ${new Date(expired) > new Date() ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    { new Date(expired) < new Date() ? 'Expired' : 'Active' }
                </span>
            )
        }
    },
    {
        accessorKey: 'createdByUser',
        header: 'Created By',
        cell: ({ row }) => {
            const createdByUser = row.original.createdByUser;
            return (
                <div className="flex flex-col">
                    <span className="font-semibold">{createdByUser?.firstname} {createdByUser?.lastname}</span>
                </div>
            )
        }
    },
    {
        accessorKey: 'createdAt',
        header: 'Created At',
        cell: ({ row }) => {
            return (
                <span>{formatToDDMMYYYY(row.original.createdAt)}</span>
            )
        }
    },
    // {
    //     id: "actions",
    //     enableHiding: false,
    //     cell: ({ row }) => {
    //         return (
    //             <div className="flex items-center gap-2">
    //                 Details
    //             </div>
    //         )
    //     }
    // }
]

