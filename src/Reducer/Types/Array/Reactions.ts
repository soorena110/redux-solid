import {ArrayActionTypes} from "../../Common/Models";

export const getArrayReactionOfActionType = (name: string, actionType: ArrayActionTypes) => {
    switch (actionType) {
        case 'Set':
            return (state: any, action: any) => {
                return {...state, [name]: Array.isArray(action.value) ? action.value : [action.value]}
            };

        case 'Add':
        case 'Push':
        case 'ReversePush':
        case 'Push/Ignore':
        case 'ReversePush/Ignore':
            return (state: any, action: any) => {
                if (!state[name]) state[name] = [] as any[];
                let value = Array.isArray(action.value) ? action.value : [action.value];

                const lastState = state[name] as any[];
                if (actionType.endsWith('Ignore'))
                    value = value.filter((v: any) => lastState.indexOf(v) == -1);

                if (value.length > 0) {
                    if (actionType.startsWith('ReversePush'))
                        state[name] = [...value, ...state[name]];
                    else
                        state[name] = [...state[name], ...value];
                    return {...state}
                }
                return state;
            };

        case 'RemoveLast':
        case 'RemoveFirst':
            return (state: any) => {
                const lastState = state[name] as any[];

                if (lastState && lastState.length) {
                    if (actionType == 'RemoveFirst')
                        state[name] = lastState.slice(1, lastState.length);
                    else
                        state[name] = lastState.slice(0, lastState.length - 1);
                    return {...state};
                }
                return state;
            };

        case 'Remove':
            return (state: any, action: any) => {
                const lastState = state[name] as any[];

                let indexes = [] as number[];
                if (action.index != undefined) {
                    indexes = Array.isArray(action.index) ? action.index : [action.index];
                    indexes = indexes.filter(ix => ix < lastState.length);
                }
                else if (action.value != undefined) {
                    const value = Array.isArray(action.value) ? action.value : [action.value];
                    indexes = value.map((v: any) => lastState.indexOf(v)).filter((ix: number) => ix != -1);
                }

                if (indexes.length) {
                    state[name] = lastState.filter((v: any, ix) => indexes.indexOf(ix) == -1);
                    return {...state}
                }
                return state;
            };

        case 'Clear':
            return (state: any) => {
                const lastState = state[name] as any[];
                if (lastState && lastState.length)
                    return {...state, [name]: []};
                return state;
            };
        default:
            const exhaustiveCheck: never = actionType;
            return (state: any) => ({...state});
    }
};