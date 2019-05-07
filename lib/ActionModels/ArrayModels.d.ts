interface ArrayActionType1 {
    command: 'Set' | 'Add' | 'Push' | 'ReversePush' | 'Push/Ignore' | 'ReversePush/Ignore';
    entity: string;
    value: any | any[];
}
interface ArrayActionType2 {
    command: 'Remove';
    entity: string;
    index: number | number[];
    value?: never;
}
interface ArrayActionType3 {
    command: 'Remove';
    entity: string;
    value: any | any[];
    index?: never;
}
interface ArrayActionType4 {
    command: 'Clear' | 'RemoveFirst' | 'RemoveLast';
    entity: string;
}
export declare type ArrayAction = ArrayActionType1 | ArrayActionType2 | ArrayActionType3 | ArrayActionType4;
export {};
