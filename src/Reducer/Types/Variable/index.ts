import {addBaseOptionsToReducer} from "../_Common";
import {ReducerCreatorOptions} from "../../ReducerCreator";
import {VariableReducerOptions} from "../../../Models/ReducerModels";
import {getValueReactionOfActionType} from "./Reactions";
import {checkValidationOfVariableAction} from "./Validation";
import {getVariableHelpReaction} from "./Help";

export const getVariableReducerActionTypeReactions = (name: string,
                                                      reducerCreatorOptions: ReducerCreatorOptions,
                                                      variableOptions: VariableReducerOptions = {}) => {
    const reactions = {} as { [actionType: string]: (state: any, action: any) => any };

    const actionTypes = variableOptions && variableOptions.actionTypes ||
        (!variableOptions.notUndefined ? ['Set', 'Clear'] : ['Set']);
    actionTypes.forEach(at => {
        reactions[`${at}_${name}`] = (state: any, action: any) => {
            const error = checkValidationOfVariableAction(action, !!variableOptions.notUndefined);
            if (!reducerCreatorOptions.supressWarnings && error) {
                console.error(error);
                console.error({state, action});
                return state;
            }
            const rawReaction = getValueReactionOfActionType(name, at, variableOptions);
            return addBaseOptionsToReducer(rawReaction, variableOptions)(state, action);
        }
    });

    reactions['Help_' + name] = getVariableHelpReaction(actionTypes, name, variableOptions);

    return reactions;
};

