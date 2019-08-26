import {FlagActionTypes} from "../../../Models/ActionTypes";
import {recreateDictionary} from "../Dictionary/_DictionaryOperations";

export const getFlagReactionOfActionType = (name: string, actionType: FlagActionTypes) => {
    name += '_flag';
    switch (actionType) {
        case 'Flag':
            return (state: any, action: any) => {
                if (!state[name]) state[name] = {};

                if (!state[name][action.key]) {
                    state[name][action.key] = true;
                    state[name] = recreateDictionary(state[name]);
                }

                return {...state}
            };
        case 'Unflag':
            return (state: any, action: any) => {
                if (!state[name]) return;
                if (state[name][action.key]) {
                    delete state[name][action.key];
                    state[name] = recreateDictionary(state[name]);
                }
                return {...state}
            };
        default:
            const exhaustiveCheck: never = actionType;
            return (state: any) => ({...state});
    }
};