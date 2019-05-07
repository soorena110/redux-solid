import { ObjectActionTypes, ObjectReducerOptions } from "../Common/Models";
export declare const getObjectHelpReaction: (actionTypes: ObjectActionTypes[], name: string, objectOptions: ObjectReducerOptions) => (state: any) => any;
export declare const checkValidationOfObjectAction: (action: any, notUndefined: boolean) => string | undefined;
