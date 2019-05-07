import { BaseReducerOptions, Reaction } from "../Common/Models";
export declare const addBaseOptionsToReducer: (reducer: Reaction, reducerOptions: BaseReducerOptions) => Reaction;
export declare const addEventsToReducer: (reducer: (state: any, action: any) => any, reducerOptions: BaseReducerOptions) => (state: any, action: any) => any;
