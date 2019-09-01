export const checkValidationOfVariableAction = (action: any, notUndefined: boolean) => {
    if (action.type.startsWith("Set")) {
        if (notUndefined && typeof action.value == "undefined")
            return 'For action.type equal to `' + action.type + '`, action.value can not be `undefined` ' +
                'because VariableOption.notUndefined is true';
    }
    if (action.type.startsWith('Clear')) {
        if (notUndefined)
            return 'Can not use `' + action.type + '` because VariableOption.notUndefined is set true.';
    }
};