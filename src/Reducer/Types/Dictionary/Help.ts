import {DictionaryActionTypes} from "../../../Models/ActionTypes";

export const getDictionaryHelpReaction = (actionTypes: DictionaryActionTypes[], name: string, dataObjectKeyName: string) => {
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