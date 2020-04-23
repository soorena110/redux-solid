import {addBaseOptionsToReducer} from "../_Common";
import {ReducerCreatorOptions} from "../../ReducerCreator";
import {MapReducerOptions} from "../../../Models/ReducerModels";
import {getMapHelpReaction} from "./Help";
import {getMapReactionOfActionType} from "./Reactions";
import {checkValidationOfMapAction} from "./Validation";


export const getMapReducerActionTypeReactions = (
    name: string, dataObjectKeyName: string, reducerCreatorOptions: ReducerCreatorOptions,
    mapOptions: MapReducerOptions = {}) => {

    const reactions = {} as { [actionType: string]: (state: any, action: any) => any };
    const actionTypes = mapOptions.actionTypes ||
        ['Set', 'Add', 'Add/Ignore', 'Add/Replace', 'Add/Merge', 'Replace', 'Merge', 'Remove', 'Clear'];
    actionTypes.forEach(at => {
        reactions[`${at}_${name}`] = (state: any, action: any) => {
            const error = checkValidationOfMapAction(action, dataObjectKeyName);
            if (!reducerCreatorOptions.supressWarnings && error) {
                console.error(error);
                console.error({state, action});
                return state;
            }
            const rawReaction = getMapReactionOfActionType(name, at, dataObjectKeyName, mapOptions);
            return addBaseOptionsToReducer(rawReaction, mapOptions)(state, action);
        }
    });

    reactions['Help_' + name] = getMapHelpReaction(actionTypes, name, dataObjectKeyName);

    return reactions;
};

