import {VariableActionTypes} from "../../../Models/ActionTypes";
import {VariableReducerOptions} from "../../../Models/ReducerModels";

export const getVariableHelpReaction = (actionTypes: VariableActionTypes[], name: string, variableOptions: VariableReducerOptions) => {
    return (state: any) => {
        const availableActions = actionTypes.map(at => {
            switch (at) {
                case 'Set':
                    return `\x1b[33m→ ${at}_${name} \x1b[37m ` + 'sets the related data to `action.value`.\n' +
                        (variableOptions.notUndefined ? '   * action.value can not be undefined.' : '');
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