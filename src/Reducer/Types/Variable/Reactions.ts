import {VariableActionTypes} from "../../../Models/ActionTypes";
import {VariableReducerOptions} from "../../../Models/ReducerModels";

export const getValueReactionOfActionType = (name: string,
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