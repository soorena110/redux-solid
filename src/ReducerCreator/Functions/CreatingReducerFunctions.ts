import {ReducerCreatorOptions} from "../ReducerCreator";
import {Reaction} from "../../Models/ReducerModels";

export const createReducerWithInitialState = (reactions: { [actionType: string]: Reaction },
                                              initialState: any = {},
                                              reducerCreatorOptions: ReducerCreatorOptions) => {

    return (state: any = initialState, action: any) => {
        const reactionKey = getStandardActionType(action, reducerCreatorOptions.supressWarnings);

        const relatedReducer = reactions[reactionKey];
        return relatedReducer ? relatedReducer(state, action) : state
    }
};



const getStandardActionType = (action: any, supressWarnings: boolean) => {
    let actionType = action.type as any;
    if (action.command && action.entity)
        actionType = action.command + '_' + action.entity;

    if (!actionType) {
        if (!supressWarnings)
            console.warn('Actions must have property with name `type` or both properties with name of `command` and `entity`\n' +
                'With both `command` and `entity`, we have `type` equal to "<command>_<entity>"');
        return undefined
    }

    if (actionType.split('_')[0].indexOf('Or') != -1)
        actionType = actionType.replace('Or', '/');

    const actionTypeParts = actionType.split('_');
    actionTypeParts[0] = actionTypeParts[0].toLowerCase();
    return actionTypeParts.join('_');
};


export const addHelpReactionToReactionDictionary = (reactions: { [actionType: string]: Reaction }) => {
    const helpReaction = Object.getOwnPropertyNames(reactions)
        .filter(key => key.startsWith('help'));

    reactions['help'] = (state) => {
        console.log('%cHelp action types are :', 'color:deepskyblue');
        helpReaction.forEach(help => console.log(help));
        return state;
    };
};


export const addResetToReactions = (reactions: { [actionType: string]: Reaction }, initialState: any) => {
    initialState = clone(initialState);
    reactions['reset'] = () => clone(initialState);
};

const clone = (theObject: any) => {
    if (!theObject)
        return theObject;

    let output = (Array.isArray(theObject) ? [] : {}) as any;
    Object.getOwnPropertyNames(theObject).forEach(key => {
        const v = theObject[key];
        output[key] = (typeof v === "object") ? clone(v) : v;
    });
    return output;
};