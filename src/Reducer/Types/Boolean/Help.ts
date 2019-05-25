import {BooleanActionTypes} from "../../../Models/ActionTypes";
import {BooleanReducerOptions} from "../../../Models/ReducerModels";

export const getBooleanHelpReaction = (actionTypes: BooleanActionTypes[], name: string, booleanOptions: BooleanReducerOptions) => {
    return (state: any) => {
        const availableActions = actionTypes.map(at => {
            switch (at) {
                case 'Set':
                    return `\x1b[33m→ ${at}_${name} \x1b[37m ` + 'set data without looking to previous data.\n' +
                        '   • action.value must be a boolean (True or False)' +
                        (booleanOptions.notUndefined ? '' : ' or undefined') + '.';
                case 'True':
                    return `\x1b[33m→ ${at}_${name} \x1b[37m ` + 'sets the related data to `True`.';
                case 'False':
                    return `\x1b[33m→ ${at}_${name} \x1b[37m ` + 'sets the related data to `False`.';
                case 'Toggle':
                    return `\x1b[33m→ ${at}_${name} \x1b[37m ` + 'toggle the related redux data.';
                case 'Clear':
                    return `\x1b[33m→ ${at}_${name} \x1b[37m ` + 'sets the related redux data to `undefined`.';
                default:
                    const exhaustiveCheck: never = at;
            }
        });


        console.log('%cAvailable action types for %c' + name + '%c are :%c\n' + availableActions.join('\n'),
            'color:#0099FF', 'color:yellow', 'color:#0099FF', '');

        return state;
    };
};