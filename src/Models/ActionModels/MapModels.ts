interface MapActionType1 {
    command: 'Set' | 'Add' | 'Add/Ignore' | 'Add/Replace' | 'Add/Merge' | 'Replace' | 'Merge';
    entity: string;
    key: string;
    value: string;

    map?: never;
    keyValue?: never;
    data?: never;
}

interface MapActionType2 {
    command: 'Set' | 'Add' | 'Add/Ignore' | 'Add/Replace' | 'Add/Merge' | 'Replace' | 'Merge';
    entity: string;
    keyValue: { key: string | number, value: any } | { key: string | number, value: any }[];

    map?: never;
    data?: never;
}

interface MapActionType3 {
    command: 'Set' | 'Add' | 'Add/Ignore' | 'Add/Replace' | 'Add/Merge' | 'Replace' | 'Merge';
    entity: string;
    data: object | object[];

    map?: never;
    keyValue?: never;
}

interface MapActionType4 {
    command: 'Set' | 'Add' | 'Add/Ignore' | 'Add/Replace' | 'Add/Merge' | 'Replace' | 'Merge';
    entity: string;
    map: { [key: string]: any } | { [key: number]: any };

    data?: never;
    keyValue?: never;
}

interface MapActionType5 {
    command: 'Remove';
    entity: string;
    key: any | any[];
}

interface MapActionType6 {
    command: 'Clear';
    entity: string;
}

export type MapAction =
    MapActionType1
    | MapActionType2
    | MapActionType3
    | MapActionType4
    | MapActionType5
    | MapActionType6;