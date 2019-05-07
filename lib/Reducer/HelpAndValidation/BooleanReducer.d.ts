import { BooleanActionTypes, BooleanReducerOptions } from "../Common/Models";
export declare const getBooleanHelpReaction: (actionTypes: BooleanActionTypes[], name: string, booleanOptions: BooleanReducerOptions) => (state: any) => any;
export declare const checkValidationOfBooleanAction: (action: any, notUndefined: boolean) => string | undefined;
