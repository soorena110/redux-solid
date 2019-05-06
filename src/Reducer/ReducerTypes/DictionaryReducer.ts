import {BaseReducerOptions, OnlyOneExists} from "./Common";
import {ReducerCreatorOptions} from "../ReducerCreator";
import {
    addKeyValuesToDictionaryIfNotExist,
    addOrMergeKeyValuesToDictionary,
    addOrReplaceKeyValuesToDictionary,
    createEmptyDictionary,
    mergeKeyValuesToDictionaryIfExists,
    recreateDictionary,
    removeKeyFromDictionaryIfExists,
    replaceKeyValuesToDictionaryIfExists
} from "./_DictionaryOperations";

type DictionaryActionTypes = 'Set' | 'Add' | 'Add/Ignore' | 'Add/Replace' | 'Add/Merge' |
    'Replace' | 'Merge' | 'Remove' | 'Clear';

export interface DictionaryReducerOptions extends BaseReducerOptions {
    actionTypes?: DictionaryActionTypes[];
    recreateDictionaryOnObjectChange?: boolean;
    isArraDictionary?: boolean;
}

export const getDictionaryReducerActionTypeReactions = (
    name: string, dataObjectKeyName: string, reducerCreatorOptions: ReducerCreatorOptions,
    dictionaryOptions: DictionaryReducerOptions = {}) => {

    const reactions = {} as { [actionType: string]: (state: any, action: any) => any };
    const actionTypes = dictionaryOptions.actionTypes ||
        ['Set', 'Add', 'Add/Ignore', 'Add/Replace', 'Add/Merge', 'Replace', 'Merge', 'Remove', 'Clear'];
    actionTypes.forEach(at => {
        reactions[`${at}_${name}`] = (state: any, action: any) => {
            const error = checkValidationOfDictionaryAction(action, dataObjectKeyName);
            if (!reducerCreatorOptions.supressWarnings && error) {
                console.error(error);
                return state;
            }
            return getReactionOfActionType(name, at, dataObjectKeyName, dictionaryOptions)(state, action)
        }
    });

    reactions['Help_' + name] = getHelpReaction(actionTypes, name, dataObjectKeyName);

    return reactions;
};


const getHelpReaction = (actionTypes: DictionaryActionTypes[], name: string, dataObjectKeyName: string) => {
    return (state: any) => {
        const availableActions = actionTypes.map(at => {
            switch (at) {
                case 'Set':
                    return `\x1b[33m→ ${at}_${name} \x1b[37m ` + 'clears the the related dictionary and pushes key-value-data(s) into it.\n' +
                        '   • key-value-data is described at the end.';
                case 'Add/Replace':
                    return `\x1b[33m→ ${at}_${name} \x1b[37m ` + 'adds an key-value-data(s) to the related redux dictionary,\n' +
                        '   However, if any item has duplicated key, replaces it.\n' +
                        '   • key-value-data is described at the end.';
                case 'Add':
                    return `\x1b[33m→ ${at}_${name} \x1b[37m ` + 'it is as same as Add/Replace_' + name + '.\n';
                case 'Add/Ignore':
                    return `\x1b[33m→ ${at}_${name} \x1b[37m ` + 'adds an key-value-data(s) to the related redux dictionary.\n' +
                        '   However, if any item has duplicated key, ignore it (does nothing for that item).\n' +
                        '   • key-value-data is described at the end.';
                case 'Add/Merge':
                    return `\x1b[33m→ ${at}_${name} \x1b[37m ` + 'adds an key-value-data(s) to the related redux dictionary.\n' +
                        '   However, if any item has duplicated key, merge it with same-key-data.\n' +
                        '   • key-value-data is described at the end.';
                case 'Replace':
                    return `\x1b[33m→ ${at}_${name} \x1b[37m ` + 'replaces an key-value-data(s) to the same-key-data(s) the related redux dictionary.\n';
                case 'Merge':
                    return `\x1b[33m→ ${at}_${name} \x1b[37m ` + 'merges an key-value-data(s) to the same-key-data(s) the related redux dictionary.\n';
                case 'Remove':
                    return `\x1b[33m→ ${at}_${name} \x1b[37m ` + 'removes an item or items of related redux array.\n' +
                        '   • action.key must be filled and is the key(s) of item(s) to be removed.\n' +
                        '   • action.key can number or string or array of number or array of string';
                case 'Clear':
                    return `\x1b[33m→ ${at}_${name} \x1b[37m ` + 'set the related redux array to empty array.';
                default:
                    const exhaustiveCheck: never = at;
            }
        });


        console.log('%cAvailable action types for %c' + name + '%c are :%c\n' + availableActions.join('\n') +
            '\n%cYou can pass key-value-data in three ways :\n' +
            '1. both of action.key and action.value\n' +
            '• key can be either string or number\n' +
            '2. action.keyValue as \n' +
            '• { key, value} as a key value object\n' +
            '• { key, value}[] as array of key value objects\n' +
            '• { [key]: data } as a dictionary (each property of this object is a key-value).\n' +
            '        key can be either string or number\n' +
            '3. action.data' +
            '• data must have a `' + dataObjectKeyName + '` property (according to <dataObjectKeyName> param) of the object\n' +
            '• array of described object.',
            'color:#0099FF', 'color:yellow', 'color:#0099FF', '', 'color:#FFFFCC');

        return state;
    };
};

const checkValidationOfDictionaryAction = (action: any, dataObjectKeyName: string) => {
    if (['Set', 'Add', 'Add/Ignore', 'Add/Replace', 'Add/Merge', 'Replace', 'Merge']
        .find(command => action.type.startsWith(command))) {
        if (!OnlyOneExists(action.key != undefined && action.value != undefined, action.keyValue, action.data != undefined))
            return 'You can only use one of below properties for action.type `' + action.type + '` :\n' +
                '   → action.key as string or number & action.value as any.\n' +
                '   → action.keyValue that can be of type one of below types :\n' +
                '   • { key: string | number, value: any } (key of type string or number)\n' +
                '   • { key: string | number, value: any }[] (key of type string or number)\n' +
                '   • { [key: string | number]: any } (a dictionary with key of type string or number)' +
                '   → action.data that is the data(s) which is going to be stored :\n' +
                '   • this can be as array of data.\n' +
                '   • it should have key property that is "id" by default.';

        if (action.key != undefined) {
            if (typeof action.key != 'string' && typeof action.key != 'number')
                return 'For `redux_dictionary` type, action.key must be string or number.';
            if (action.value == undefined)
                return 'For `redux_dictionary` type, action.key must be beside of action.value.';
        }
        else if (action.keyValue) {
            if (typeof action.keyValue.key != 'string' && typeof action.keyValue.key != 'number')
                return 'For `redux_dictionary` type, action.keyValue.key must be string or number.';
            if (action.keyValue.value == undefined)
                return 'For `redux_dictionary` type, action.keyValue.key must be beside of action.keyValue.value.';
            if (Array.isArray(action.keyValue)) {
                if (action.keyValue.find((kv: any) => !action.keyValue[kv] ||
                    typeof action.keyValue[kv].key != 'string' && typeof action.keyValue[kv].key != 'number' ||
                    action.keyValue[kv].key != undefined && action.keyValue[kv].value == undefined
                ))
                    return 'For `redux_dictionary` type, action.keyValue as array must be of ' +
                        'type array of {key:string | number, value:any}. (key of type string or number)';
            }
        }
        else if (action.data) {
            if (Array.isArray(action.data)) {
                if (action.data.find((d: any) => !d[dataObjectKeyName]))
                    return 'For `redux_dictionary` type, action.data can be array of data,' +
                        '\but each array item must have property with name <dataObjectKeyName>.\n' +
                        '• <dataObjectKeyName> is defined when creating the reducer.' +
                        '• <dataObjectKeyName> value is `id` by default'
            }
            else if (!action.data[dataObjectKeyName])
                return 'For `redux_dictionary` type, action.data can be object,' +
                    'but must property with name <dataObjectKeyName>.\n' +
                    '• <dataObjectKeyName> is defined when creating the reducer.' +
                    '• <dataObjectKeyName> value is `id` by default'
        }
    }
    else if (action.type.startsWith('Remove')) {
        if (action.key == undefined)
            return 'For `redux_dictionary` to remove an item, actions should have key';

        if ((typeof action.key != 'string' && typeof action.key != 'number' &&
            (!Array.isArray(action.key) ||
                action.find((a: any) => a != 'string' && typeof a != 'number'))))
            return 'For `redux_dictionary` type, action.key as array only must be of type one of below :\n' +
                '   → string\n' +
                '   → number\n' +
                '   → string[] (array of string)\n' +
                '   → number[] (array of number)';
    }
};

const getReactionOfActionType = (name: string, actionTypes: DictionaryActionTypes,
                                 dataObjectKeyName: string, dictionaryOptions: DictionaryReducerOptions) => {
    switch (actionTypes) {
        case 'Set':
            return (state: any, action: any) => {
                const newDictionary = createEmptyDictionary(dictionaryOptions.isArraDictionary);
                const keyValues = getKeyValuesFromAction(action, dataObjectKeyName);
                addOrReplaceKeyValuesToDictionary(newDictionary, keyValues);
                return {...state, [name]: newDictionary}
            };
        case 'Add':
        case 'Add/Replace':
            return (state: any, action: any) => {
                if (!state[name]) state[name] = createEmptyDictionary(dictionaryOptions.isArraDictionary);
                const keyValues = getKeyValuesFromAction(action, dataObjectKeyName);
                const isItemAddedOrRemoved = addOrReplaceKeyValuesToDictionary(state[name], keyValues);

                if (isItemAddedOrRemoved || dictionaryOptions.recreateDictionaryOnObjectChange != false)
                    state[name] = recreateDictionary(state[name], dictionaryOptions.isArraDictionary);
                return {...state}
            };
        case 'Add/Ignore':
            return (state: any, action: any) => {
                if (!state[name]) state[name] = createEmptyDictionary(dictionaryOptions.isArraDictionary);
                const keyValues = getKeyValuesFromAction(action, dataObjectKeyName);
                const isItemAddedOrRemoved = addKeyValuesToDictionaryIfNotExist(state[name], keyValues);

                if (isItemAddedOrRemoved || dictionaryOptions.recreateDictionaryOnObjectChange != false)
                    state[name] = recreateDictionary(state[name], dictionaryOptions.isArraDictionary);
                return {...state}
            };
        case 'Add/Merge':
            return (state: any, action: any) => {
                if (!state[name]) state[name] = createEmptyDictionary(dictionaryOptions.isArraDictionary);
                const keyValues = getKeyValuesFromAction(action, dataObjectKeyName);
                const isItemAddedOrRemoved = addOrMergeKeyValuesToDictionary(state[name], keyValues);

                if (isItemAddedOrRemoved || dictionaryOptions.recreateDictionaryOnObjectChange != false)
                    state[name] = recreateDictionary(state[name], dictionaryOptions.isArraDictionary);
                return {...state}
            };
        case 'Replace':
            return (state: any, action: any) => {
                const keyValues = getKeyValuesFromAction(action, dataObjectKeyName);
                const isItemAddedOrRemoved = replaceKeyValuesToDictionaryIfExists(state[name], keyValues);

                if (isItemAddedOrRemoved || dictionaryOptions.recreateDictionaryOnObjectChange != false)
                    state[name] = recreateDictionary(state[name], dictionaryOptions.isArraDictionary);
                return {...state}
            };
        case 'Merge':
            return (state: any, action: any) => {
                const keyValues = getKeyValuesFromAction(action, dataObjectKeyName);
                const isItemAddedOrRemoved = mergeKeyValuesToDictionaryIfExists(state[name], keyValues);

                if (isItemAddedOrRemoved || dictionaryOptions.recreateDictionaryOnObjectChange != false)
                    state[name] = recreateDictionary(state[name], dictionaryOptions.isArraDictionary);
                return {...state}
            };
        case 'Remove':
            return (state: any, action: any) => {
                const keyValues = getKeyValuesFromAction(action, dataObjectKeyName);
                const isItemAddedOrRemoved = removeKeyFromDictionaryIfExists(state[name], keyValues);

                if (isItemAddedOrRemoved || dictionaryOptions.recreateDictionaryOnObjectChange != false)
                    state[name] = recreateDictionary(state[name], dictionaryOptions.isArraDictionary);
                return {...state}
            };
        case 'Clear':
            return (state: any) => {
                return {...state, [name]: createEmptyDictionary(dictionaryOptions.isArraDictionary)}
            };
        default:
            const exhaustiveCheck: never = actionTypes;
            return (state: any) => ({...state});
    }
};


const getKeyValuesFromAction = (action: any, dataObjectKeyName: string): { key: string, value: any }[] => {
    if (action.key) // for DictionaryActionType1 & DictionaryActionType4
    {
        if (Array.isArray(action.key)) // if action.key is typeof string[]
            return action.key.map((k: string) => ({key: k, value: k}));
        return [{key: action.key, value: action.value}]; // if action.key is typeof string
    }
    else if (action.keyValue) { // for DictionaryActionType2
        if (Array.isArray(action.keyValue)) { // if action.keyValue is typeof { key: string, value: string }[]
            return action.keyValue.map((kv: any) => {
                if (kv.key && kv.value)
                    return {key: kv.key, value: kv.value};
            })
        }
        else if (action.keyValue.key && action.keyValue.value) {  // if action.keyValue is typeof { key: string, value: string }
            return [action.keyValue];
        }
        else { // if action.keyValue is typeof { [key: string]: any }
            Object.getOwnPropertyNames(action.keyValue).map(key => ({key, value: action.keyValue[key]}))
        }
    }
    else if (action.data) {// for DictionaryActionType3
        if (Array.isArray(action.data)) // if action.data is typeof object[]
            return action.data.map((d: any) => ({key: d[dataObjectKeyName], value: d}));
        else  // if action.data is typeof object
            return [{key: action.data[dataObjectKeyName], value: action.data}];
    }
    return [] // for DictionaryActionType5
};

