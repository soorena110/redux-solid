interface VariableActionType1 {
    command: 'Set';
    entity: string;
    value?: any;
}

interface VariableActionType2 {
    command: 'Clear';
    entity: string;
}

export type  VariableAction = VariableActionType1 | VariableActionType2;
