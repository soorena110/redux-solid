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