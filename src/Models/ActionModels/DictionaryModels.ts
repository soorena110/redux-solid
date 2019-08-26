interface DictionaryActionType1 {
    command: 'Set' | 'Add' | 'Add/Ignore' | 'Add/Replace' | 'Add/Merge' | 'Replace' | 'Merge';
    entity: string;
    key: string;
    value: string;

    dictionary?: never;
    keyValue?: never;
    data?: never;
}

interface DictionaryActionType2 {
    command: 'Set' | 'Add' | 'Add/Ignore' | 'Add/Replace' | 'Add/Merge' | 'Replace' | 'Merge';
    entity: string;
    keyValue: { key: string | number, value: any } | { key: string | number, value: any }[];

    dictionary?: never;
    data?: never;
}

interface DictionaryActionType3 {
    command: 'Set' | 'Add' | 'Add/Ignore' | 'Add/Replace' | 'Add/Merge' | 'Replace' | 'Merge';
    entity: string;
    data: object | object[];

    dictionary?: never;
    keyValue?: never;
}

interface DictionaryActionType4 {
    command: 'Set' | 'Add' | 'Add/Ignore' | 'Add/Replace' | 'Add/Merge' | 'Replace' | 'Merge';
    entity: string;
    dictionary: { [key: string]: any } | { [key: number]: any };

    data?: never;
    keyValue?: never;
}

interface DictionaryActionType5 {
    command: 'Remove';
    entity: string;
    key: string | string[] | number | number[];
}

interface DictionaryActionType6 {
    command: 'Clear';
    entity: string;
}

export type DictionaryAction =
    DictionaryActionType1
    | DictionaryActionType2
    | DictionaryActionType3
    | DictionaryActionType4
    | DictionaryActionType5
    | DictionaryActionType6;