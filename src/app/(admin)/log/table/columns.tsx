import { ColumnDef } from "@tanstack/react-table";

import { formatToDDMMYYYY } from "@/lib/utils";
import { TResponseLog } from "@/schema/log";
export const columns: ColumnDef<TResponseLog>[] = [
    {
        accessorKey: 'user',
        header: 'Customer Info',
        cell: ({ row }) => {
            const user = row.original.customerPoint?.user;
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
        accessorKey: 'transaction',
        header: 'Transaction',
        cell: ({ row }) => {
            const transaction = row.original.customerPoint.transaction;
            return (
                transaction ? (
                <span className="text-left">
                    <div className="flex flex-col">
                        <span className="font-semibold">
                            Cut: {transaction?.cutPoint || '-'}
                        </span>
                        <span className="text-sm text-gray-500">
                            Note: {transaction?.note || '-'}
                        </span>
                        <span className="text-sm text-gray-500">
                            Reward: {transaction?.reward?.name || '-'}
                        </span>
                        <span className="text-sm text-gray-500">
                            Location: {transaction?.location?.name || '-'}
                        </span>
                    </div>
                </span>
                ) : (
                    <div className="text-gray-500">No Transaction</div>
                )
            )
        }
    },
    {
        accessorKey: 'point',
        header: 'Rule Point',
        cell: ({ row }) => {
            const rulePoint = row.original.customerPoint.rulePoint;
            return (
                rulePoint ? (
                    <div className="flex flex-col">
                        <span className="font-semibold">
                            Name: {rulePoint.name || '-'}
                        </span>
                        <span className="text-sm text-gray-500">
                            Multiplier: {`${rulePoint.multiplier}x` || '-'}
                        </span>
                    </div>
                ) : (
                    <div className="text-gray-500">No Rule Point</div>
                )
            )
        }
    },
    {
        accessorKey: 'oldPoints',
        header: 'Old Point',
        cell: ({ row }) => {
            const oldPoints = row.original.oldPoints;
            return (
                <span className="text-right">
                    {oldPoints ? oldPoints.toLocaleString('id-ID') : '-'}
                </span>
            )
        }
    },
    {
        accessorKey: 'newPoints',
        header: 'New Point',
        cell: ({ row }) => {
            const newPoints = row.original.newPoints;
            return (
                <span className="text-right">
                    {newPoints ? newPoints.toLocaleString('id-ID') : '-'}
                </span>
            )
        }
    },
    {
        accessorKey: 'pointDefference',
        header: 'Point Difference',
        cell: ({ row }) => {
            const pointDifference = row.original.pointDifference;
            return (
                <span className="text-right">
                    {pointDifference ? pointDifference.toLocaleString('id-ID') : '-'}
                </span>
            )
        }
    },
    {
        accessorKey: 'action',
        header: 'Action',
    },
    {
        accessorKey: 'createdByUser',
        header: 'Created By',
        cell: ({ row }) => {
            const createdByUser = row.original.createdUser;
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

