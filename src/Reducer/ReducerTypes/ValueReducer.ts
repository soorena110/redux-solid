import {BaseReducerOptions} from "./Common";
import {ReducerCreatorOptions} from "../ReducerCreator";

type VariableActionTypes = 'Set' | 'Clear';

export interface VariableReducerOptions extends BaseReducerOptions {
    actionTypes?: VariableActionTypes[];
    notUndefined?: boolean;
    preventUnchangedDispatch?: boolean;
}


export const getVariableReducerActionTypeReactions = (name: string,
                                                      reducerCreatorOptions: ReducerCreatorOptions,
                                                      variableOptions: VariableReducerOptions = {}) => {
    const reactions = {} as { [actionType: string]: (state: any, action: any) => any };

    const actionTypes = variableOptions && variableOptions.actionTypes ||
        (!variableOptions.notUndefined ? ['Set', 'Clear'] : ['Set']);
    actionTypes.forEach(at => {
        reactions[`${at}_${name}`] = (state: any, action: any) => {
            const error = checkValidationOfVariableAction(action, !!variableOptions.notUndefined);
            if (!reducerCreatorOptions.supressWarnings && error) {
                console.error(error);
                return state;
            }
            return getReactionOfActionType(name, at, variableOptions)(state, action)
        }
    });

    reactions['Help_' + name] = getHelpReaction(actionTypes, name, variableOptions);

    return reactions;
};


const getHelpReaction = (actionTypes: VariableActionTypes[], name: string, variableOptions: VariableReducerOptions) => {
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

const getReactionOfActionType = (name: string,
                                 actionTypes: VariableActionTypes,
                                 variableOptions: VariableReducerOptions) => {
    switch (actionTypes) {
        case 'Set':
            return (state: any, action: { value: any }) => {
                if (variableOptions.preventUnchangedDispatch != false && state[name] == action.value)
                    return state;
                return {...state, [name]: action.value}
            };
        case 'Clear':
            return (state: any) => {
                if (variableOptions.preventUnchangedDispatch != false && state[name] == undefined)
                    return state;
                return {...state, [name]: undefined}
            };
        default:
            const exhaustiveCheck: never = actionTypes;
            return (state: any) => ({...state});
    }
};


const checkValidationOfVariableAction = (action: any, notUndefined: boolean) => {
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