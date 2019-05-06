export declare const addOrReplaceKeyValuesToDictionary: (dictionary: {
    [key: string]: any;
}, keyValues: {
    key: string;
    value: any;
}[]) => boolean;
export declare const addOrMergeKeyValuesToDictionary: (dictionary: {
    [key: string]: any;
}, keyValues: {
    key: string;
    value: any;
}[]) => boolean;
export declare const mergeKeyValuesToDictionaryIfExists: (dictionary: {
    [key: string]: any;
}, keyValues: {
    key: string;
    value: any;
}[]) => boolean;
export declare const replaceKeyValuesToDictionaryIfExists: (dictionary: {
    [key: string]: any;
}, keyValues: {
    key: string;
    value: any;
}[]) => boolean;
export declare const addKeyValuesToDictionaryIfNotExist: (dictionary: {
    [key: string]: any;
}, keyValues: {
    key: string;
    value: any;
}[]) => boolean;
export declare const removeKeyFromDictionaryIfExists: (dictionary: {
    [key: string]: any;
}, keyValues: {
    key: string;
    value: any;
}[]) => boolean;
export declare const createEmptyDictionary: (isArraDictionary?: boolean) => {
    [key: string]: any;
};
export declare const recreateDictionary: (dictionary: {
    [key: string]: any;
}, isArraDictionary?: boolean) => {
    [key: string]: any;
};
