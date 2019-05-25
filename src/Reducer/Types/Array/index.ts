import {addBaseOptionsToReducer} from "../_Common";
import {ReducerCreatorOptions} from "../../ReducerCreator";
import {ArrayReducerOptions} from "../../../Models/ReducerModels";
import {getArrayReactionOfActionType} from "./Reactions";
import {getArrayHelpReaction} from "./Help";
import {checkValidationOfArrayAction} from "./Validation";


export const getArrayReducerActionTypeReactions = (
    name: string, reducerCreatorOptions: ReducerCreatorOptions,
    arrayOptions: ArrayReducerOptions = {}) => {

    const reactions = {} as { [actionType: string]: (state: any, action: any) => any };
    const actionTypes = arrayOptions.actionTypes ||
        ['Set', 'Add', 'Push', 'RemoveLast', 'ReversePush', 'RemoveFirst', 'Push/Ignore', 'ReversePush/Ignore',
            'Remove', 'Clear'];
    actionTypes.forEach(at => {
        reactions[`${at}_${name}`] = (state: any, action: any) => {
            const error = checkValidationOfArrayAction(action);
            if (!reducerCreatorOptions.supressWarnings && error) {
                console.error(error);
                console.error({state, action});
                return state;
            }
            const rawReaction = getArrayReactionOfActionType(name, at);
            return addBaseOptionsToReducer(rawReaction, arrayOptions)(state, action);
        }
    });
    reactions['Help_' + name] = getArrayHelpReaction(actionTypes, name);

    return reactions;
};

