import { ReducerCreatorOptions } from "../ReducerCreator";
import { ArrayReducerOptions } from "../Common/Models";
export declare const getArrayReducerActionTypeReactions: (name: string, reducerCreatorOptions: ReducerCreatorOptions, arrayOptions?: ArrayReducerOptions) => {
    [actionType: string]: (state: any, action: any) => any;
};
