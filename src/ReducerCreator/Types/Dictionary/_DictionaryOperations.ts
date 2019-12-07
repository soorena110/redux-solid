export const addOrReplaceKeyValuesToDictionary = (dictionary: { [key: string]: any }, keyValues: { key: string, value: any }[]) => {
    const isChanged1 = replaceKeyValuesToDictionaryIfExists(dictionary, keyValues);
    const isChanged2 = addKeyValuesToDictionaryIfNotExist(dictionary, keyValues);
    return isChanged1 || isChanged2;
};

export const addOrMergeKeyValuesToDictionary = (dictionary: { [key: string]: any }, keyValues: { key: string, value: any }[]) => {
    const isChanged1 = mergeKeyValuesToDictionaryIfExists(dictionary, keyValues);
    const isChanged2 = addKeyValuesToDictionaryIfNotExist(dictionary, keyValues);
    return isChanged1 || isChanged2;
};

export const mergeKeyValuesToDictionaryIfExists = (dictionary: { [key: string]: any }, keyValues: { key: string, value: any }[]) => {
    const existingKeyValues = getKeyValuesExistInDictionary(dictionary, keyValues);
    existingKeyValues.forEach(({key, value}) => dictionary[key] = {...dictionary[key], ...value});
    return existingKeyValues.length > 0;
};

export const replaceKeyValuesToDictionaryIfExists = (dictionary: { [key: string]: any }, keyValues: { key: string, value: any }[]) => {
    const existingKeyValues = getKeyValuesExistInDictionary(dictionary, keyValues);
    existingKeyValues.forEach(({key, value}) => dictionary[key] = value);
    return existingKeyValues.length > 0;
};

export const addKeyValuesToDictionaryIfNotExist = (dictionary: { [key: string]: any }, keyValues: { key: string, value: any }[]) => {
    const notExistingKeyValues = getKeyValuesNotExistInDictionary(dictionary, keyValues);
    notExistingKeyValues.forEach(({key, value}) => dictionary[key] = value);
    return notExistingKeyValues.length > 0;
};

export const removeKeyFromDictionaryIfExists = (dictionary: { [key: string]: any }, keyValues: { key: string, value: any }[]) => {
    const existingKeyValues = getKeyValuesExistInDictionary(dictionary, keyValues);
    existingKeyValues.forEach(({key}) => delete dictionary[key]);
    return existingKeyValues.length > 0;

};


export const createEmptyDictionary = (isArraDictionary = false): { [key: string]: any } => {
    if (isArraDictionary)
        return [];
    return {};
};

export const recreateDictionary = (dictionary: { [key: string]: any }, isArraDictionary = false) => {
    const newDictionary = createEmptyDictionary(isArraDictionary);
    Object.getOwnPropertyNames(dictionary).forEach(key => newDictionary[key] = dictionary[key]);
    return newDictionary;
};

const getKeyValuesExistInDictionary = (dictionary: { [key: string]: any }, keyValues: { key: string, value: any }[]) =>
    keyValues.filter(({key}) => dictionary && dictionary[key]);

const getKeyValuesNotExistInDictionary = (dictionary: { [key: string]: any }, keyValues: { key: string, value: any }[]) =>
    keyValues.filter(({key}) => !dictionary || !dictionary[key]);
