import {addBaseOptionsToReducer} from "../_Common";
import {ReducerCreatorOptions} from "../../ReducerCreator";
import {DictionaryReducerOptions} from "../../Common/Models";
import {checkValidationOfDictionaryAction, getDictionaryHelpReaction} from "./HelpAndValidation";
import {getDictionaryReactionOfActionType} from "./Reactions";


export const getDictionaryReducerActionTypeReactions = (
    name: string, dataObjectKeyName: string, reducerCreatorOptions: ReducerCreatorOptions,
    dictionaryOptions: DictionaryReducerOptions = {}) => {

    const reactions = {} as { [actionType: string]: (state: any, action: any) => any };
    const actionTypes = dictionaryOptions.actionTypes ||
        ['Set', 'Add', 'Add/Ignore', 'Add/Replace', 'Add/Merge', 'Replace', 'Merge', 'Remove', 'Clear'];
    actionTypes.forEach(at => {
        reactions[`${at}_${name}`] = (state: any, action: any) => {
            const error = checkValidationOfDictionaryAction(action, dataObjectKeyName);
            if (!reducerCreatorOptions.supressWarnings && error) {
                console.error(error);
                console.error({state, action});
                return state;
            }
            const rawReaction = getDictionaryReactionOfActionType(name, at, dataObjectKeyName, dictionaryOptions);
            return addBaseOptionsToReducer(rawReaction, dictionaryOptions)(state, action);
        }
    });

    reactions['Help_' + name] = getDictionaryHelpReaction(actionTypes, name, dataObjectKeyName);

    return reactions;
};

