import {ObjectActionTypes, ObjectReducerOptions} from "../Common/Models";

export const getObjectHelpReaction = (actionTypes: ObjectActionTypes[], name: string, objectOptions: ObjectReducerOptions) => {
    return (state: any) => {
        const availableActions = actionTypes.map(at => {
            switch (at) {
                case 'Set':
                    return `\x1b[33m→ ${at}_${name} \x1b[37m ` + 'sets the related data to `action.value`.\n' +
                        (objectOptions.notUndefined ? '   • action.value can not be undefined.' : '');
                case 'Merge':
                    return `\x1b[33m→ ${at}_${name} \x1b[37m ` + 'merges the related data with `action.value`.';
                case 'Clear':
                    return `\x1b[33m→ ${at}_${name} \x1b[37m ` + 'sets the related redux data to undefined.';
                default:
                    const exhaustiveCheck: never = at;
            }
        });


        console.log('%cAvailable action types for %c' + name + '%c are :%c\n' + availableActions.join('\n'),
            'color:#0099FF', 'color:yellow', 'color:#0099FF', '');

        return state;
    };
};


export const checkValidationOfObjectAction = (action: any, notUndefined: boolean) => {

    if (action.type.startsWith("Set")) {
        if (notUndefined && typeof action.value == "undefined")
            return 'For action.type equal to `' + action.type + '`, action.value can not be `undefined` ' +
                'because ObjectOption.notUndefined is true';
        if (typeof action.value != 'object' && typeof action.value != 'undefined')
            return 'For action.type equal to `' + action.type + '`, action.value must be an `object`.\n' +
                'it also can be `undefined` if ObjectOption.notUndefined is not true.'
    }
    if (action.type.startsWith('Merge')) {
        if (typeof action.value != 'object')
            return 'For action.type equal to `' + action.type + '`, action.value must be an `object`.'
    }
    if (action.type.startsWith('Clear')) {
        if (notUndefined)
            return 'Can not use `' + action.type + '` because ObjectOption.notUndefined is set true.';
    }
};