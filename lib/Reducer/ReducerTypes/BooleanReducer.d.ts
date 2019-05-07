import { ReducerCreatorOptions } from "../ReducerCreator";
import { BooleanReducerOptions } from "../Common/Models";
export declare const getBooleanReducerActionTypeReactions: (name: string, reducerCreatorOptions: ReducerCreatorOptions, booleanOptions?: BooleanReducerOptions) => {
    [actionType: string]: (state: any, action: any) => any;
};
