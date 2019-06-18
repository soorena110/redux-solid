import {ObjectActionTypes} from "../../../Models/ActionTypes";
import {ObjectReducerOptions} from "../../../Models/ReducerModels";

export const getObjectHelpReaction = (actionTypes: ObjectActionTypes[], name: string, objectOptions: ObjectReducerOptions) => {
    return (state: any) => {
        const availableActions = actionTypes.map(at => {
            switch (at) {
                case 'Set':
                    return `\x1b[33m→ ${at}_${name} \x1b[37m ` + 'sets the related data to `action.value`.\n' +
                        (objectOptions.notUndefined ? '   * action.value can not be undefined.' : '');
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