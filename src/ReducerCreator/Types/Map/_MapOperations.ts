export const addOrReplaceKeyValuesToMap = (map: Map<any, any>, keyValues: { key: string, value: any }[]) => {
    replaceKeyValuesToMapIfExists(map, keyValues);
    return addKeyValuesToMapIfNotExist(map, keyValues);
};

export const addOrMergeKeyValuesToMap = (map: Map<any, any>, keyValues: { key: string, value: any }[]) => {
    mergeKeyValuesToMapIfExists(map, keyValues);
    return addKeyValuesToMapIfNotExist(map, keyValues);
};

export const mergeKeyValuesToMapIfExists = (map: Map<any, any>, keyValues: { key: string, value: any }[]) => {
    const existingKeyValues = getKeysExistInMap(map, keyValues);
    existingKeyValues.forEach(({key, value}) => map.set(key, {...map.get(key), ...value}));
    return existingKeyValues.length > 0;
};

export const replaceKeyValuesToMapIfExists = (map: Map<any, any>, keyValues: { key: string, value: any }[]) => {
    const existingKeyValues = getKeysExistInMap(map, keyValues);
    existingKeyValues.forEach(({key, value}) => map.set(key, value));
    return existingKeyValues.length > 0;
};

export const addKeyValuesToMapIfNotExist = (map: Map<any, any>, keyValues: { key: string, value: any }[]) => {
    const notExistingKeyValues = getKeysNotExistInMap(map, keyValues);
    notExistingKeyValues.forEach(({key, value}) => map.set(key, value));
    return notExistingKeyValues.length > 0;
};

export const removeKeyFromMapIfExists = (map: Map<any, any>, keys: any[]) => {
    const existingKeyValues = keys.filter(key => map.has(key));
    existingKeyValues.forEach(key => map.delete(key));
    return existingKeyValues.length > 0;
};


export const recreateMap = (map: Map<any, any>) =>
    new Map(map.entries());

const getKeysExistInMap = (map: Map<any, any>, keyValues: { key: string, value: any }[]) =>
    keyValues.filter(({key, value}) => {
        if (!key) {
            console.error("key", key);
            console.error("value", value);
            throw new Error("The key is not valid");
        }
        return map && map.has(key)
    });

const getKeysNotExistInMap = (map: Map<any, any>, keyValues: { key: string, value: any }[]) =>
    keyValues.filter(({key, value}) => {
        if (!key) {
            console.error("key", key);
            console.error("value", value);
            throw new Error("The key is not valid");
        }
        return !map || !map.has(key)
    });
