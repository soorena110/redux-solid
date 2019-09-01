class ReduxLogger {
    static groupCollapse(event: string, text: string = '') {
        console.groupCollapsed('%c Redux  %c ' + event + ' %c' + text,
            'background:#7700FF',
            'color:#' + ReduxLogger.getSudoColorByText(event),
            'color:#FFFFFF');
    }

    static log(title: string, value: any) {
        console.log('%c' + title, 'color:yellow', value)
    }

    static groupEnd() {
        console.groupEnd();
    }

    static getSudoColorByText(text: string) {
        let hash = 0;
        for (let i = 0; i < text.length; i++)
            hash = text.charCodeAt(i) + ((hash << 5) - hash);
        let c = (hash & 0x00FFFFFF)
            .toString(16)
            .toUpperCase();
        return "00000".substring(0, 6 - c.length) + c;
    }
}


const round = (number: number) => Math.round(number * 100) / 100;

const monitorReducerEnhancer = (createStore: any) => (
    reducer: any,
    initialState: any,
    enhancer: any
) => {
    const monitoredReducer = (state: any, action: any) => {
        const start = performance.now();
        const newState = reducer(state, action);
        const end = performance.now();
        const diff = round(end - start);

        ReduxLogger.groupCollapse('dispatch', action.type);
        ReduxLogger.log('prevState', state);
        ReduxLogger.log('nextState', newState);
        ReduxLogger.log('executeTime', diff);
        ReduxLogger.groupEnd();

        return newState
    };

    return createStore(monitoredReducer, initialState, enhancer)
};

export default monitorReducerEnhancer