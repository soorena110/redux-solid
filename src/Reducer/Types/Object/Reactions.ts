import {ObjectReducerOptions} from "../../../Models/ReducerModels";
import {ObjectActionTypes} from "../../../Models/ActionTypes";

export const getObjectReactionOfActionType = (name: string,
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