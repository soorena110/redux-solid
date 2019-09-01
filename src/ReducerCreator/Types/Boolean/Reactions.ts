import {BooleanReducerOptions} from "../../../Models/ReducerModels";
import {BooleanActionTypes} from "../../../Models/ActionTypes";

export const getBooleanReactionOfActionType = (name: string,
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