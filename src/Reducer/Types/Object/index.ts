import {addBaseOptionsToReducer} from "../_Common";
import {ReducerCreatorOptions} from "../../ReducerCreator";
import {ObjectReducerOptions} from "../../../Models/ReducerModels";
import {getObjectReactionOfActionType} from "./Reactions";
import {getObjectHelpReaction} from "./Help";
import {checkValidationOfObjectAction} from "./Validation";

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
            const rawReaction = getObjectReactionOfActionType(name, at, objectOptions);
            return addBaseOptionsToReducer(rawReaction, objectOptions)(state, action);
        }
    });

    reactions['Help_' + name] = getObjectHelpReaction(actionTypes, name, objectOptions);

    return reactions;
};

