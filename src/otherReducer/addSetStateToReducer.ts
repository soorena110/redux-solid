export const addSetStateToReducer = (reducer: any) => {
    return (state: any, action: any) => {
        if (action.type.toLowerCase() == 'setstate')
            state = action.state;

        return reducer(state, action)
    };
};