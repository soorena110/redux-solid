import { ReducerCreatorOptions } from "../ReducerCreator";
import { ObjectReducerOptions } from "../Common/Models";
export declare const getObjectReducerActionTypeReactions: (name: string, reducerCreatorOptions: ReducerCreatorOptions, objectOptions?: ObjectReducerOptions) => {
    [actionType: string]: (state: any, action: any) => any;
};
