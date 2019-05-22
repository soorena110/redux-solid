import {addBaseOptionsToReducer} from "./_Common";
import {ReducerCreatorOptions} from "../ReducerCreator";
import {ObjectActionTypes, ObjectReducerOptions} from "../Common/Models";
import {checkValidationOfObjectAction, getObjectHelpReaction} from "../HelpAndValidation/ObjectReducer";

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
                console.error({state, action});
                return state;
            }
            const rawReaction = getReactionOfActionType(name, at, objectOptions);
            return addBaseOptionsToReducer(rawReaction, objectOptions)(state, action);
        }
    });

    reactions['Help_' + name] = getObjectHelpReaction(actionTypes, name, objectOptions);

    return reactions;
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