interface BooleanActionType1 {
    command: 'Set';
    entity: string;
    value?: boolean;
}

interface BooleanActionType2 {
    command: 'True' | 'False' | 'Clear' | 'Toggle';
    entity: string;
}

export type  BooleanAction = BooleanActionType1 | BooleanActionType2;
