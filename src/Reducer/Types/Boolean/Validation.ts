export const checkValidationOfBooleanAction = (action: any, notUndefined: boolean) => {
    if (action.type.startsWith("Set")) {
        if (typeof action.value != 'boolean' && typeof action.value != "undefined")
            return 'For action.type equal to `' + action.type + '`, action.value must be one of below values:\n' +
                '   → `true` or `false`\n' +
                '   → `undefined (if BooleanOption.notUndefined is not true)`';
        if (notUndefined && typeof action.value == "undefined")
            return 'For action.type equal to `' + action.type + '`, action.value can not be `undefined` ' +
                'because BooleanOption.notUndefined is true';
    }
    else if (action.type.startsWith('Clear')) {
        if (notUndefined)
            return 'Can not use `' + action.type + '` because BooleanOption.notUndefined is set true.';
    }
};
