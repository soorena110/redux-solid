import {VariableActionTypes, VariableReducerOptions} from "../Common/Models";

export const getVariableHelpReaction = (actionTypes: VariableActionTypes[], name: string, variableOptions: VariableReducerOptions) => {
    return (state: any) => {
        const availableActions = actionTypes.map(at => {
            switch (at) {
                case 'Set':
                    return `\x1b[33m→ ${at}_${name} \x1b[37m ` + 'sets the related data to `action.value`.\n' +
                        (variableOptions.notUndefined ? '   • action.value can not be undefined.' : '');
                case 'Clear':
                    return `\x1b[33m→ ${at}_${name} \x1b[37m ` + 'sets the related data to `undefined`.';
                default:
                    const exhaustiveCheck: never = at;
            }
        });


        console.log('%cAvailable action types for %c' + name + '%c are :%c\n' + availableActions.join('\n'),
            'color:#0099FF', 'color:yellow', 'color:#0099FF', '');

        return state;
    };
};


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