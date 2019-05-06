import { ReducerCreatorOptions } from "../ReducerCreator";
export declare type CacheMethodTypes = 'none' | 'localStorage';
export declare type Reaction = (state: any, action: any) => any;
export declare type ReducerType = (state: any, action: any) => any;
export interface CachingOptions {
    cacheMethod: CacheMethodTypes;
    cacheName: string;
    _notYet_cacheExpireDate?: never;
}
export declare const createReducerWithInitialState: (reactions: {
    [actionType: string]: Reaction;
}, initialState: any, reducerCreatorOptions: ReducerCreatorOptions) => (state: any, action: any) => any;
export declare const addCachingToReducer: (reducer: ReducerType, cachingOptions: CachingOptions) => ReducerType;
export declare const readLastSavedState: (cachingOptions: CachingOptions) => any;
export declare const saveLastSavedState: (cachingOptions: CachingOptions, savingState: any) => void;
export declare const addHelpReactionToReactionDictionary: (reactions: {
    [actionType: string]: Reaction;
}) => void;
