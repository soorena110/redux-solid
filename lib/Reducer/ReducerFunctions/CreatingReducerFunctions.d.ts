import { ReducerCreatorOptions } from "../ReducerCreator";
import { CachingOptions, Reaction, ReducerType } from "../Common/Models";
export declare const createReducerWithInitialState: (reactions: {
    [actionType: string]: Reaction;
}, initialState: any, reducerCreatorOptions: ReducerCreatorOptions) => (state: any, action: any) => any;
export declare const addCachingToReducer: (reducer: ReducerType, cachingOptions: CachingOptions) => ReducerType;
export declare const readLastSavedState: (cachingOptions: CachingOptions) => any;
export declare const saveLastSavedState: (cachingOptions: CachingOptions, savingState: any) => void;
export declare const addHelpReactionToReactionDictionary: (reactions: {
    [actionType: string]: Reaction;
}) => void;
