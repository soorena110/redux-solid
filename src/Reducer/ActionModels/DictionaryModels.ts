interface DictionaryActionType1 {
    command: 'Set' | 'Add' | 'Add/Ignore' | 'Add/Replace' | 'Add/Merge' | 'Replace' | 'Merge';
    entity: string;
    key: string;
    value: string;
}

interface DictionaryActionType2 {
    command: 'Set' | 'Add' | 'Add/Ignore' | 'Add/Replace' | 'Add/Merge' | 'Replace' | 'Merge';
    entity: string;
    keyValue: { key: string | number, value: any } | { key: string | number, value: any }[] |
        { [key: string]: any } | { [key: number]: any };

    data?: never;
}

interface DictionaryActionType3 {
    command: 'Set' | 'Add' | 'Add/Ignore' | 'Add/Replace' | 'Add/Merge' | 'Replace' | 'Merge';
    entity: string;
    data: object | object[];

    keyValue?: never;
}

interface DictionaryActionType4 {
    command: 'Remove';
    entity: string;
    key: string | string[] | number | number[];
}

interface DictionaryActionType5 {
    command: 'Clear';
    entity: string;
}

export type DictionaryAction =
    DictionaryActionType1
    | DictionaryActionType2
    | DictionaryActionType3
    | DictionaryActionType4
    | DictionaryActionType5;