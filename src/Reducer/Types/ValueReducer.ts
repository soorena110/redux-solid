import {addBaseOptionsToReducer} from "./_Common";
import {ReducerCreatorOptions} from "../ReducerCreator";
import {VariableActionTypes, VariableReducerOptions} from "../Common/Models";
import {checkValidationOfVariableAction, getVariableHelpReaction} from "../HelpAndValidation/ValueReducer";

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
                console.error({state, action});
                return state;
            }
            const rawReaction = getReactionOfActionType(name, at, variableOptions);
            return addBaseOptionsToReducer(rawReaction, variableOptions)(state, action);
        }
    });

    reactions['Help_' + name] = getVariableHelpReaction(actionTypes, name, variableOptions);

    return reactions;
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
