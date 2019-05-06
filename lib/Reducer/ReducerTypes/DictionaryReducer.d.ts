import { BaseReducerOptions } from "./Common";
import { ReducerCreatorOptions } from "../ReducerCreator";
declare type DictionaryActionTypes = 'Set' | 'Add' | 'Add/Ignore' | 'Add/Replace' | 'Add/Merge' | 'Replace' | 'Merge' | 'Remove' | 'Clear';
export interface DictionaryReducerOptions extends BaseReducerOptions {
    actionTypes?: DictionaryActionTypes[];
    recreateDictionaryOnObjectChange?: boolean;
    isArraDictionary?: boolean;
}
export declare const getDictionaryReducerActionTypeReactions: (name: string, dataObjectKeyName: string, reducerCreatorOptions: ReducerCreatorOptions, dictionaryOptions?: DictionaryReducerOptions) => {
    [actionType: string]: (state: any, action: any) => any;
};
export {};
