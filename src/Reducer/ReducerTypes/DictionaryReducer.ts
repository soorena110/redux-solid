import {addBaseOptionsToReducer} from "./_Common";
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
import {DictionaryActionTypes, DictionaryReducerOptions} from "../Common/Models";
import {checkValidationOfDictionaryAction, getDictionaryHelpReaction} from "../HelpAndValidation/DictionaryReducer";


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
            const rawReaction = getReactionOfActionType(name, at, dataObjectKeyName, dictionaryOptions);
            return addBaseOptionsToReducer(rawReaction, dictionaryOptions)(state, action);
        }
    });

    reactions['Help_' + name] = getDictionaryHelpReaction(actionTypes, name, dataObjectKeyName);

    return reactions;
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

