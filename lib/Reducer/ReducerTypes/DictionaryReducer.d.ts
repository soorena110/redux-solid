import { ReducerCreatorOptions } from "../ReducerCreator";
import { DictionaryReducerOptions } from "../Common/Models";
export declare const getDictionaryReducerActionTypeReactions: (name: string, dataObjectKeyName: string, reducerCreatorOptions: ReducerCreatorOptions, dictionaryOptions?: DictionaryReducerOptions) => {
    [actionType: string]: (state: any, action: any) => any;
};
