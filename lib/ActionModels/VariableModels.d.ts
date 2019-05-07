interface VariableActionType1 {
    command: 'Set';
    entity: string;
    value?: any;
}
interface VariableActionType2 {
    command: 'Clear';
    entity: string;
}
export declare type VariableAction = VariableActionType1 | VariableActionType2;
export {};
