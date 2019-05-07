import { VariableActionTypes, VariableReducerOptions } from "../Common/Models";
export declare const getVariableHelpReaction: (actionTypes: VariableActionTypes[], name: string, variableOptions: VariableReducerOptions) => (state: any) => any;
export declare const checkValidationOfVariableAction: (action: any, notUndefined: boolean) => string | undefined;
