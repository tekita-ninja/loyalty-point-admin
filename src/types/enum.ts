export enum EnumPointType {
    ADD = 1,
    CUSTOM = 2,
    TRANSACTION = 3,
}

export const EnumPointTypeLabels: Record<EnumPointType, string> = {
    [EnumPointType.ADD]: 'Add',
    [EnumPointType.CUSTOM]: 'Custom',
    [EnumPointType.TRANSACTION]: 'Transaction',
};

export enum EnumStatusTransaction {
    PENDING = 0,
    CONFIRMED = 1,
}

export const EnumStatusTransactionLabel: Record<EnumStatusTransaction, string> = {
    [EnumStatusTransaction.PENDING]: 'Pending',
    [EnumStatusTransaction.CONFIRMED]: 'Confirmed',
};
