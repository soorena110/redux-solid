import {ReducerCreatorOptions} from "../ReducerCreator";
import {CachingOptions, Reaction, ReducerType} from "../../Models/ReducerModels";

export const createReducerWithInitialState = (reactions: { [actionType: string]: Reaction },
                                              initialState: any = {},
                                              reducerCreatorOptions: ReducerCreatorOptions) => {

    return (state: any = initialState, action: any) => {
        const reactionKey = getStandardActionType(action, reducerCreatorOptions.supressWarnings);
        if (!action.type && reactionKey)
            action.type = reactionKey;

        const relatedReducer = reactions[reactionKey];
        return relatedReducer ? relatedReducer(state, action) : state
    }
};

export const addCachingToReducer = (reducer: ReducerType, cachingOptions: CachingOptions) => {
    if (cachingOptions.cacheMethod == 'none')
        return reducer;

    return (state: any, actions: any) => {
        const newState = reducer(state, actions);
        if (state !== newState)
            saveLastSavedState(cachingOptions, newState);
        return newState;
    }
};

export const readLastSavedState = (cachingOptions: CachingOptions) => {

    if (cachingOptions.cacheMethod == 'localStorage') {
        try {
            const lastState = localStorage.getItem(cachingOptions.cacheName as string);
            if (lastState)
                return JSON.parse(lastState)
        } catch {
            console.error('Could not retrieve last state for reducer `' + cachingOptions.cacheName + '`.')
        }
    }

    return undefined;
};


export const saveLastSavedState = (cachingOptions: CachingOptions, savingState: any) => {
    if (cachingOptions.cacheMethod == 'localStorage') {
        try {
            localStorage.setItem(cachingOptions.cacheName as string, JSON.stringify(savingState));
        } catch (e) {
            console.error('Could not retrieve last state for reducer `' + cachingOptions.cacheName + '`.', e)
        }
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

    actionType = actionType[0].toUpperCase() + actionType.substr(1);
    return actionType;
};


export const addHelpReactionToReactionDictionary = (reactions: { [actionType: string]: Reaction }) => {
    const helpReaction = Object.getOwnPropertyNames(reactions)
        .filter(key => key.startsWith('Help'));

    reactions['Help'] = (state) => {
        console.log('%cHelp action types are :', 'color:deepskyblue');
        helpReaction.forEach(help => console.log(help));
        return state;
    };
    reactions['help'] = reactions['Help'];
};