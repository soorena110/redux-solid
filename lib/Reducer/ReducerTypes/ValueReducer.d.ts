import { ReducerCreatorOptions } from "../ReducerCreator";
import { VariableReducerOptions } from "../Common/Models";
export declare const getVariableReducerActionTypeReactions: (name: string, reducerCreatorOptions: ReducerCreatorOptions, variableOptions?: VariableReducerOptions) => {
    [actionType: string]: (state: any, action: any) => any;
};
