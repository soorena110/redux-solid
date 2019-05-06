import { BaseReducerOptions } from "./Common";
import { ReducerCreatorOptions } from "../ReducerCreator";
declare type BooleanActionTypes = 'Set' | 'True' | 'False' | 'Clear' | 'Toggle';
export interface BooleanReducerOptions extends BaseReducerOptions {
    actionTypes?: BooleanActionTypes[];
    notUndefined?: boolean;
    preventUnchangedDispatch?: boolean;
}
export declare const getBooleanReducerActionTypeReactions: (name: string, reducerCreatorOptions: ReducerCreatorOptions, booleanOptions?: BooleanReducerOptions) => {
    [actionType: string]: (state: any, action: any) => any;
};
export {};
