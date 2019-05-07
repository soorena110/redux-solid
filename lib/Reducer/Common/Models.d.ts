export declare type ArrayActionTypes = 'Set' | 'Add' | 'Push' | 'RemoveLast' | 'ReversePush' | 'RemoveFirst' | 'Push/Ignore' | 'ReversePush/Ignore' | 'Remove' | 'Clear';
export declare type BooleanActionTypes = 'Set' | 'True' | 'False' | 'Clear' | 'Toggle';
export declare type DictionaryActionTypes = 'Set' | 'Add' | 'Add/Ignore' | 'Add/Replace' | 'Add/Merge' | 'Replace' | 'Merge' | 'Remove' | 'Clear';
export declare type ObjectActionTypes = 'Set' | 'Clear' | 'Merge';
export declare type VariableActionTypes = 'Set' | 'Clear';
export interface ArrayReducerOptions extends BaseReducerOptions {
    actionTypes?: ArrayActionTypes[];
}
export interface ReducerEventArgs {
    action: any;
    state: any;
}
export interface BaseReducerOptions {
    events?: {
        onReducing?: (e: ReducerEventArgs) => void;
        onReduced?: (e: ReducerEventArgs) => void;
    };
    _notYet_shouldLog?: never;
    _notYet_expiration?: {
        timeout: number;
    };
}
export interface BooleanReducerOptions extends BaseReducerOptions {
    actionTypes?: BooleanActionTypes[];
    notUndefined?: boolean;
    preventUnchangedDispatch?: boolean;
}
export interface DictionaryReducerOptions extends BaseReducerOptions {
    actionTypes?: DictionaryActionTypes[];
    recreateDictionaryOnObjectChange?: boolean;
    isArraDictionary?: boolean;
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
export declare type CacheMethodTypes = 'none' | 'localStorage';
export declare type Reaction = (state: any, action: any) => any;
export declare type ReducerType = (state: any, action: any) => any;
export interface CachingOptions {
    cacheMethod: CacheMethodTypes;
    cacheName: string;
    _notYet_cacheExpireDate?: never;
}
