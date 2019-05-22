import {BaseReducerOptions, Reaction} from "../Common/Models";

export const addBaseOptionsToReducer = (reducer: Reaction, reducerOptions: BaseReducerOptions) => {
    reducer = addEventsToReducer(reducer, reducerOptions);
    reducer = addEventsToReducer(reducer, reducerOptions);

    return reducer;
};

const addEventsToReducer = (reducer: (state: any, action: any) => any, reducerOptions: BaseReducerOptions) => {
    return (state: any, action: any) => {
        if (reducerOptions.events && reducerOptions.events.onReducing)
            reducerOptions.events.onReducing({state, action});

        const newState = reducer(state, action);

        if (reducerOptions.events && reducerOptions.events.onReduced)
            reducerOptions.events.onReduced({state: newState, action});

        return newState;
    }
};


const addCachingToReducer = (reducer: (state: any, action: any) => any, reducerOptions: BaseReducerOptions) => {
    // return (state: any, action: any) => {
    //     if (reducerOptions.cacheMethod == 'none')
    //         return reducer;
    //
    //     const newState = reducer(state, action);
    //
    //     if (reducerOptions.events && reducerOptions.events.onReduced)
    //         reducerOptions.events.onReduced({state: newState, action});
    //
    //     return newState;
    // }
};