import {BooleanActionTypes} from "../../../Models/ActionTypes";
import {BooleanReducerOptions} from "../../../Models/ReducerModels";

export const getBooleanHelpReaction = (actionTypes: BooleanActionTypes[], name: string, booleanOptions: BooleanReducerOptions) => {
    return (state: any) => {
        const availableActions = actionTypes.map(at => {
            switch (at) {
                case 'Set':
                    return `\x1b[33m→ ${at}_${name} \x1b[37m ` + 'Set value without looking to previous data.\n' +
                        '   * `action.value` must be a boolean (True or False)' +
                        (booleanOptions.notUndefined ? '' : ' or undefined') + '.';
                case 'True':
                    return `\x1b[33m→ ${at}_${name} \x1b[37m ` + 'Sets the related value to `True`.';
                case 'False':
                    return `\x1b[33m→ ${at}_${name} \x1b[37m ` + 'Sets the related value to `False`.';
                case 'Toggle':
                    return `\x1b[33m→ ${at}_${name} \x1b[37m ` + 'Toggle the related redux boolean value.';
                case 'Clear':
                    return `\x1b[33m→ ${at}_${name} \x1b[37m ` + 'Sets the related redux value to `undefined`.';
                default:
                    const exhaustiveCheck: never = at;
            }
        });


        console.log('%cAvailable action types for %c' + name + '%c are :%c\n' + availableActions.join('\n'),
            'color:#0099FF', 'color:yellow', 'color:#0099FF', '');

        return state;
    };
};