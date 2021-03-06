import {
    ArrayActionTypes,
    BooleanActionTypes,
    DictionaryActionTypes,
    MapActionTypes,
    ObjectActionTypes,
    VariableActionTypes
} from "./ActionTypes";


export interface ReducerEventArgs {
    action: any;
    state: any;
}

interface Duration {
    milliseconds?: number;
    seconds?: number;
    minutes?: number;
    hours?: number;
    days?: number;
}

export interface BaseReducerOptions {
    events?: {
        onReducing?: (e: ReducerEventArgs) => void;
        onReduced?: (e: ReducerEventArgs) => void;
    }
    _notYet_expiration?: Duration
    _notYet_compareOptimization?: 'deep' | 'shallow' | 'json';

    cachingOptions?: CachingOptions;
}

export interface BooleanReducerOptions extends BaseReducerOptions {
    actionTypes?: BooleanActionTypes[];
    notUndefined?: boolean;
    preventUnchangedDispatch?: boolean;
}


export interface DictionaryReducerOptions extends BaseReducerOptions {
    actionTypes?: DictionaryActionTypes[];
    recreateDictionaryOnObjectChange?: boolean;
    isArrayDictionary?: boolean;
}

export interface MapReducerOptions extends BaseReducerOptions {
    actionTypes?: MapActionTypes[];
    recreateMapOnObjectChange?: boolean;
}


export interface ArrayReducerOptions extends BaseReducerOptions {
    actionTypes?: ArrayActionTypes[];
}


export interface ObjectReducerOptions extends BaseReducerOptions {
    actionTypes?: ObjectActionTypes[];
    notUndefined?: boolean;
    preventUnchangedDispatch?: boolean;
}

export interface VariableReducerOptions extends BaseReducerOptions {
    actionTypes?: VariableActionTypes[];
    notUndefined?: boolean;
    preventUnchangedDispatch?: boolean;
}

export interface FlagReducerOptions extends BaseReducerOptions {
}


export type CacheMethodTypes = 'none' | 'localStorage';
export type Reaction = (state: any, action: any) => any;
export type ReducerType = (state: any, action: any) => any;

export interface CachingOptions {
    cacheMethod: CacheMethodTypes;
    cacheName?: string;
    _notYet_cacheExpireDate?: never;
}
