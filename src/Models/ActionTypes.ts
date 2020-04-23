export type ArrayActionTypes = 'Set' | 'Add' | 'Push' | 'RemoveLast' | 'ReversePush' | 'RemoveFirst' |
    'Push/Ignore' | 'ReversePush/Ignore' | 'Remove' | 'Clear' ;

export type BooleanActionTypes = 'Set' | 'True' | 'False' | 'Clear' | 'Toggle';

export type DictionaryActionTypes = 'Set' | 'Add' | 'Add/Ignore' | 'Add/Replace' | 'Add/Merge' |
    'Replace' | 'Merge' | 'Remove' | 'Clear';

export type MapActionTypes = 'Set' | 'Add' | 'Add/Ignore' | 'Add/Replace' | 'Add/Merge' |
    'Replace' | 'Merge' | 'Remove' | 'Clear';

export type ObjectActionTypes = 'Set' | 'Clear' | 'Merge';

export type VariableActionTypes = 'Set' | 'Clear';

export type FlagActionTypes = 'Flag' | 'Unflag';


export type AllActionTypes =
    ArrayActionTypes
    | BooleanActionTypes
    | DictionaryActionTypes
    | ObjectActionTypes
    | VariableActionTypes