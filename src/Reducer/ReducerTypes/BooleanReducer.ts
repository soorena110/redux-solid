import {BaseReducerOptions} from "./Common";
import {ReducerCreatorOptions} from "../ReducerCreator";

type BooleanActionTypes = 'Set' | 'True' | 'False' | 'Clear' | 'Toggle';

export interface BooleanReducerOptions extends BaseReducerOptions {
    actionTypes?: BooleanActionTypes[];
    notUndefined?: boolean;
    preventUnchangedDispatch?: boolean;
}


export const getBooleanReducerActionTypeReactions = (name: string,
                                                     reducerCreatorOptions: ReducerCreatorOptions,
                                                     booleanOptions: BooleanReducerOptions = {}) => {
    const reactions = {} as { [actionType: string]: (state: any, action: any) => any };

    const actionTypes = booleanOptions && booleanOptions.actionTypes ||
        (!booleanOptions.notUndefined ? ['Set', 'True', 'False', 'Clear', 'Toggle'] :
            ['Set', 'True', 'False', 'Toggle'] as BooleanActionTypes[]);
    actionTypes.forEach(at => {
        reactions[`${at}_${name}`] = (state: any, action: any) => {
            const error = checkValidationOfBooleanAction(action, !!booleanOptions.notUndefined);
            if (!reducerCreatorOptions.supressWarnings && error) {
                console.error(error);
                return state;
            }
            return getReactionOfActionType(name, at, booleanOptions)(state, action)
        }
    });

    reactions['Help_' + name] = getHelpReaction(actionTypes, name, booleanOptions);

    return reactions;
};


const getHelpReaction = (actionTypes: BooleanActionTypes[], name: string, booleanOptions: BooleanReducerOptions) => {
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

const getReactionOfActionType = (name: string,
                                 actionTypes: BooleanActionTypes,
                                 booleanOptions: BooleanReducerOptions) => {
    switch (actionTypes) {
        case 'Set':
            return (state: any, action: { value?: boolean }) => {
                if (booleanOptions.preventUnchangedDispatch != false && state[name] == action.value)
                    return state;
                return {...state, [name]: action.value}
            };
        case 'True':
            return (state: any) => {
                if (booleanOptions.preventUnchangedDispatch != false && state[name] == true)
                    return state;
                return {...state, [name]: true}
            };
        case 'False':
            return (state: any) => {
                if (booleanOptions.preventUnchangedDispatch != false && state[name] == false)
                    return state;
                return {...state, [name]: false}
            };
        case 'Toggle':
            return (state: any) => ({
                ...state, [name]: !state[name]
            });
        case 'Clear':
            return (state: any) => {
                if (booleanOptions.preventUnchangedDispatch != false && state[name] == undefined)
                    return state;
                return {...state, [name]: undefined}
            };
        default:
            const exhaustiveCheck: never = actionTypes;
            return (state: any) => ({...state});
    }
};


const checkValidationOfBooleanAction = (action: any, notUndefined: boolean) => {
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