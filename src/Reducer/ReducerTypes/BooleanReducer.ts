import {addBaseOptionsToReducer} from "./_Common";
import {ReducerCreatorOptions} from "../ReducerCreator";
import {BooleanActionTypes, BooleanReducerOptions} from "../Common/Models";
import {checkValidationOfBooleanAction, getBooleanHelpReaction} from "../HelpAndValidation/BooleanReducer";

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
            const rawReaction = getReactionOfActionType(name, at, booleanOptions);
            return addBaseOptionsToReducer(rawReaction, booleanOptions)(state, action);
        }
    });

    reactions['Help_' + name] = getBooleanHelpReaction(actionTypes, name, booleanOptions);

    return reactions;
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