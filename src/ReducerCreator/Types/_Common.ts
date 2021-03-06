import {BaseReducerOptions, Reaction} from "../../Models/ReducerModels";

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

export const onlyOneExists = (...params: any) => params.filter((p: any) => p).length == 1;
