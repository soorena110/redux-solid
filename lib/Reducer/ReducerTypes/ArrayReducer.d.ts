import { BaseReducerOptions } from "./Common";
import { ReducerCreatorOptions } from "../ReducerCreator";
declare type ArrayActionTypes = 'Set' | 'Add' | 'Push' | 'RemoveLast' | 'ReversePush' | 'RemoveFirst' | 'Push/Ignore' | 'ReversePush/Ignore' | 'Remove' | 'Clear';
export interface ArrayReducerOptions extends BaseReducerOptions {
    actionTypes?: ArrayActionTypes[];
}
export declare const getArrayReducerActionTypeReactions: (name: string, reducerCreatorOptions: ReducerCreatorOptions, arrayOptions?: ArrayReducerOptions) => {
    [actionType: string]: (state: any, action: any) => any;
};
export {};
