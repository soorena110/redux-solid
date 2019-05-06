import { BaseReducerOptions } from "./Common";
import { ReducerCreatorOptions } from "../ReducerCreator";
declare type VariableActionTypes = 'Set' | 'Clear';
export interface VariableReducerOptions extends BaseReducerOptions {
    actionTypes?: VariableActionTypes[];
    notUndefined?: boolean;
    preventUnchangedDispatch?: boolean;
}
export declare const getVariableReducerActionTypeReactions: (name: string, reducerCreatorOptions: ReducerCreatorOptions, variableOptions?: VariableReducerOptions) => {
    [actionType: string]: (state: any, action: any) => any;
};
export {};
