import {
    addKeyValuesToMapIfNotExist,
    addOrMergeKeyValuesToMap,
    addOrReplaceKeyValuesToMap,
    mergeKeyValuesToMapIfExists,
    recreateMap,
    removeKeyFromMapIfExists,
    replaceKeyValuesToMapIfExists
} from "./_MapOperations";
import {MapReducerOptions} from "../../../Models/ReducerModels";
import {MapActionTypes} from "../../../Models/ActionTypes";


export const getMapReactionOfActionType = (name: string, actionTypes: MapActionTypes,
                                           dataObjectKeyName: string, mapOptions: MapReducerOptions) => {
    switch (actionTypes) {
        case 'Set':
            return (state: any, action: any) => {
                if (action.map)
                    return {...state, [name]: action.map};

                const keyValues = getKeyValuesFromAction(action, dataObjectKeyName)
                    .map(({key, value}) => [key, value]) as any;
                return {...state, [name]: new Map(keyValues)}
            };
        case 'Add':
        case 'Add/Replace':
            return (state: any, action: any) => {
                if (!state[name]) state[name] = new Map();

                const keyValues = getKeyValuesFromAction(action, dataObjectKeyName);
                const isAnyItemAdded = addOrReplaceKeyValuesToMap(state[name], keyValues);

                if (isAnyItemAdded || mapOptions.recreateMapOnObjectChange != false)
                    state[name] = recreateMap(state[name]);
                return {...state}
            };
        case 'Add/Ignore':
            return (state: any, action: any) => {
                if (!state[name]) state[name] = new Map();

                const keyValues = getKeyValuesFromAction(action, dataObjectKeyName);
                const isAnyItemAdded = addKeyValuesToMapIfNotExist(state[name], keyValues);

                if (isAnyItemAdded || mapOptions.recreateMapOnObjectChange != false)
                    state[name] = recreateMap(state[name], );
                return {...state}
            };
        case 'Add/Merge':
            return (state: any, action: any) => {
                if (!state[name]) state[name] = new Map();

                const keyValues = getKeyValuesFromAction(action, dataObjectKeyName);
                const isAnyItemAdded = addOrMergeKeyValuesToMap(state[name], keyValues);

                if (isAnyItemAdded || mapOptions.recreateMapOnObjectChange != false)
                    state[name] = recreateMap(state[name], );
                return {...state}
            };
        case 'Replace':
            return (state: any, action: any) => {
                const keyValues = getKeyValuesFromAction(action, dataObjectKeyName);
                replaceKeyValuesToMapIfExists(state[name], keyValues);

                if (mapOptions.recreateMapOnObjectChange != false)
                    state[name] = recreateMap(state[name], );
                return {...state}
            };
        case 'Merge':
            return (state: any, action: any) => {
                const keyValues = getKeyValuesFromAction(action, dataObjectKeyName);
                mergeKeyValuesToMapIfExists(state[name], keyValues);

                if (mapOptions.recreateMapOnObjectChange != false)
                    state[name] = recreateMap(state[name], );
                return {...state}
            };
        case 'Remove':
            return (state: any, action: any) => {
                const keys: string[] = Array.isArray(action.key) ? action.key : [action.key];

                const isAnyItemRemoved = removeKeyFromMapIfExists(state[name], keys);
                if (isAnyItemRemoved || mapOptions.recreateMapOnObjectChange != false)
                    state[name] = recreateMap(state[name]);
                return {...state}
            };
        case 'Clear':
            return (state: any) => {
                if (Object.keys(state[name]).length)
                    return {...state, [name]: new Map()}
            };
        default:
            const exhaustiveCheck: never = actionTypes;
            return (state: any) => ({...state});
    }
};


const getKeyValuesFromAction = (action: any, dataObjectKeyName: string): { key: string, value: any }[] => {
    if (action.key) // for MapActionType1 & MapActionType5
    {
        if (Array.isArray(action.key)) // if action.key is typeof string[]
            return action.key.map((k: string) => ({key: k, value: k}));
        return [{key: action.key, value: action.value}]; // if action.key is typeof string
    } else if (action.keyValue) { // for MapActionType2
        if (Array.isArray(action.keyValue))  // if action.keyValue is typeof { key: string, value: string }[]
            return action.keyValue.map((kv: any) => {
                if (kv.key && kv.value)
                    return {key: kv.key, value: kv.value};
            });
        else if (action.keyValue.key && action.keyValue.value)  // if action.keyValue is typeof { key: string, value: string }
            return [action.keyValue];
    } else if (action.data) {// for MapActionType3
        if (Array.isArray(action.data)) // if action.data is typeof object[]
            return action.data.map((d: any) => ({key: d[dataObjectKeyName], value: d}));
        else  // if action.data is typeof object
            return [{key: action.data[dataObjectKeyName], value: action.data}];
    } else if (action.map)   // for MapActionType4
        return Array.from(action.map.entries()).map(([key, value]: any) => ({key, value}));

    return [] // for MapActionType6
};