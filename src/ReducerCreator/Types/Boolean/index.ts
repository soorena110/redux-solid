import {addBaseOptionsToReducer} from "../_Common";
import {ReducerCreatorOptions} from "../../ReducerCreator";
import {BooleanReducerOptions} from "../../../Models/ReducerModels";
import {getBooleanHelpReaction} from "./Help";
import {BooleanActionTypes} from "../../../Models/ActionTypes";
import {checkValidationOfBooleanAction} from "./Validation";
import {getBooleanReactionOfActionType} from "./Reactions";

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
                console.error({state, action});
                return state;
            }
            const rawReaction = getBooleanReactionOfActionType(name, at, booleanOptions);
            return addBaseOptionsToReducer(rawReaction, booleanOptions)(state, action);
        }
    });

    reactions['Help_' + name] = getBooleanHelpReaction(actionTypes, name, booleanOptions);

    return reactions;
};

