import {BaseReducerOptions} from "./Common";
import {ReducerCreatorOptions} from "../ReducerCreator";

type ObjectActionTypes = 'Set' | 'Clear' | 'Merge';

export interface ObjectReducerOptions extends BaseReducerOptions {
    actionTypes?: ObjectActionTypes[];
    notUndefined?: boolean;
    preventUnchangedDispatch?: boolean;
}


export const getObjectReducerActionTypeReactions = (name: string,
                                                    reducerCreatorOptions: ReducerCreatorOptions,
                                                    objectOptions: ObjectReducerOptions = {}) => {
    const reactions = {} as { [actionType: string]: (state: any, action: any) => any };

    const actionTypes = objectOptions && objectOptions.actionTypes ||
        ['Set', 'Clear', 'Merge'];
    actionTypes.forEach(at => {
        reactions[`${at}_${name}`] = (state: any, action: any) => {
            const error = checkValidationOfObjectAction(action, !!objectOptions.notUndefined);
            if (!reducerCreatorOptions.supressWarnings && error) {
                console.error(error);
                return state;
            }
            return getReactionOfActionType(name, at, objectOptions)(state, action)
        }
    });

    reactions['Help_' + name] = getHelpReaction(actionTypes, name, objectOptions);

    return reactions;
};


const getHelpReaction = (actionTypes: ObjectActionTypes[], name: string, objectOptions: ObjectReducerOptions) => {
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

const getReactionOfActionType = (name: string,
                                 actionTypes: ObjectActionTypes,
                                 objectOptions: ObjectReducerOptions) => {
    switch (actionTypes) {
        case 'Set':
            return (state: any, action: { value: any }) => {
                if (objectOptions.preventUnchangedDispatch != false && state[name] == action.value)
                    return state;
                return {...state, [name]: action.value}
            };
        case 'Merge':
            return (state: any, action: { value: any }) => {
                if (objectOptions.preventUnchangedDispatch != false && state[name] == action.value)
                    return state;
                return {...state, [name]: Object.assign(state[name], action.value)}
            };
        case 'Clear':
            return (state: any) => {
                if (objectOptions.preventUnchangedDispatch != false && state[name] == undefined)
                    return state;
                return {...state, [name]: undefined}
            };
        default:
            const exhaustiveCheck: never = actionTypes;
            return (state: any) => ({...state});
    }
};


const checkValidationOfObjectAction = (action: any, notUndefined: boolean) => {

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