import { BaseReducerOptions } from "./Common";
import { ReducerCreatorOptions } from "../ReducerCreator";
declare type ObjectActionTypes = 'Set' | 'Clear' | 'Merge';
export interface ObjectReducerOptions extends BaseReducerOptions {
    actionTypes?: ObjectActionTypes[];
    notUndefined?: boolean;
    preventUnchangedDispatch?: boolean;
}
export declare const getObjectReducerActionTypeReactions: (name: string, reducerCreatorOptions: ReducerCreatorOptions, objectOptions?: ObjectReducerOptions) => {
    [actionType: string]: (state: any, action: any) => any;
};
export {};
