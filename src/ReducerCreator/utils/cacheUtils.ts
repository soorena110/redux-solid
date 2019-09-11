import {CachingOptions, ReducerType} from "../../Models/ReducerModels";


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