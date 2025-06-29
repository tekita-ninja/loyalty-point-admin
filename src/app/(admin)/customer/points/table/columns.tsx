import { ColumnDef } from "@tanstack/react-table";

import { TResponseCustomerPoint } from "@/schema/customer-poin";
import { EnumPointType, EnumPointTypeLabels } from "@/types/enum";
import { formatToDDMMYYYY } from "@/lib/utils";
import FormCancel from "../dialog/cancel";
import PermissionContainer from "@/components/permission-container";
export const columns: ColumnDef<TResponseCustomerPoint>[] = [
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
        accessorKey: 'transaction',
        header: 'Transaction',
        cell: ({ row }) => {
            const transaction = row.original.transaction;
            return (
                <div className="w-64">
                    {
                        transaction ? (
                            <span className="text-left">
                                <div className="flex flex-col">
                                    <span className="font-semibold">
                                        Cut Point: {transaction?.cutPoint || '-'}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        Qty: {transaction?.qty || '-'}
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
                    }
                </div>
            )
        }
    },
    {
        accessorKey: 'point',
        header: 'Rule Point',
        cell: ({ row }) => {
            const rulePoint = row.original.rulePoint;
            return (
                <div className="w-32">
                    {
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
                    }
                </div>
            )
        }
    },
    {
        accessorKey: 'price',
        header: 'Price',
        cell: ({ row }) => {
            const price = row.original.price;
            return (
                <span className={`text-right ${price ? '' : 'text-gray-500'}`}>
                    {price ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price) : 'No Price'}
                </span>
            )
        }
    },
    {
        accessorKey: 'point',
        header: 'Point',
        cell: ({ row }) => {
            const point = row.original.point;
            return (
                <span className="text-right">
                    {point ? point.toLocaleString('id-ID') : '-'}
                </span>
            )
        }
    },
    {
        accessorKey: 'note',
        header: 'Notes',
        cell: ({ row }) => {
            const note = row.original.note;
            return (
                <div className="w-36">
                    <span className="text-sm text-gray-500">{note || '-'}</span>
                </div>
            )
        }
    },
    {
        accessorKey: 'type',
        header: 'Type',
        cell: ({ row }) => {
            const type = row.original.type;
            return (
                <span className="text-center">
                    {EnumPointTypeLabels[type as EnumPointType] || 'Unknown'}
                </span>
            )
        }
    },
    {
        accessorKey: 'isCancel',
        header: 'Cancel',
        cell: ({ row }) => {
            const isCancel = row.original.isCancel;
            return (
                <span className="text-center">
                    {isCancel ? 'Yes' : 'No'}
                </span>
            )
        }
    },
    {
        accessorKey: 'isExpired',
        header: 'Expired',
        cell: ({ row }) => {
            const isExpired = row.original.isExpired;
            return (
                <span className="text-center">
                    {isExpired ? 'Yes' : 'No'}
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
                <div className="w-32">
                    <span className="font-semibold">{createdByUser.firstname} {createdByUser.lastname}</span>
                </div>
            )
        }
    },
    {
        accessorKey: 'createdAt',
        header: 'Created At',
        cell: ({ row }) => {
            return (
                <div className="w-28">{formatToDDMMYYYY(row.original.createdAt)}</div>
            )
        }
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2">
                    <PermissionContainer permission='POST_point/cancel/:customerPointId'>
                        {!row.original.isCancel ? (<FormCancel data={row.original} />) : undefined}


                    </PermissionContainer>
                    {/* Details */}
                </div>
            )
        }
    }
]

