import { DictionaryActionTypes } from "../Common/Models";
export declare const getDictionaryHelpReaction: (actionTypes: DictionaryActionTypes[], name: string, dataObjectKeyName: string) => (state: any) => any;
export declare const checkValidationOfDictionaryAction: (action: any, dataObjectKeyName: string) => string | undefined;
