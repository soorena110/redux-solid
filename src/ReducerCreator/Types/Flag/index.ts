import {addBaseOptionsToReducer} from "../_Common";
import {ReducerCreatorOptions} from "../../ReducerCreator";
import {FlagReducerOptions} from "../../../Models/ReducerModels";
import {getFlagReactionOfActionType} from "./Reactions";
import {getFlagHelpReaction} from "./Help";
import {checkValidationOfFlagAction} from "./Validation";
import {FlagActionTypes} from "../../../Models/ActionTypes";


export const getFlagReducerActionTypeReactions = (
    name: string, reducerCreatorOptions: ReducerCreatorOptions,
    arrayOptions: FlagReducerOptions = {}) => {

    const reactions = {} as { [actionType: string]: (state: any, action: any) => any };
    const actionTypes = ['Flag', 'Unflag'] as FlagActionTypes[];
    actionTypes.forEach(at => {
        reactions[`${at}_${name}`] = (state: any, action: any) => {
            const error = checkValidationOfFlagAction(action);
            if (!reducerCreatorOptions.supressWarnings && error) {
                console.error(error);
                console.error({state, action});
                return state;
            }
            const rawReaction = getFlagReactionOfActionType(name, at);
            return addBaseOptionsToReducer(rawReaction, arrayOptions)(state, action);
        }
    });
    reactions['Help_' + name] = getFlagHelpReaction(actionTypes, name);

    return reactions;
};

