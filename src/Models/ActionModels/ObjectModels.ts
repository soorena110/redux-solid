interface ObjectActionType1 {
    command: 'Set' | 'Merge';
    entity: string;
    value?: object;
}

interface ObjectActionType2 {
    command: 'Clear';
    entity: string;
}

export type  ObjectAction = ObjectActionType1 | ObjectActionType2;
