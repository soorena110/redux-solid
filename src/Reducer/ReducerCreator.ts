import {
    addCachingToReducer,
    addHelpReactionToReactionDictionary,
    createReducerWithInitialState,
    readLastSavedState
} from "./ReducerFunctions/CreatingReducerFunctions";
import {
    ArrayReducerOptions,
    BooleanReducerOptions,
    CachingOptions,
    DictionaryReducerOptions,
    ObjectReducerOptions,
    Reaction,
    VariableReducerOptions
} from "./Common/Models";
import {getDictionaryReducerActionTypeReactions} from "./ReducerTypes/Dictionary";
import {getBooleanReducerActionTypeReactions} from "./ReducerTypes/BooleanReducer";
import {getVariableReducerActionTypeReactions} from "./ReducerTypes/ValueReducer";
import {getObjectReducerActionTypeReactions} from "./ReducerTypes/ObjectReducer";
import {getArrayReducerActionTypeReactions} from "./ReducerTypes/ArrayReducer";

interface ReducerOptions {
    cachingOptions?: Partial<CachingOptions>
}

export interface ReducerCreatorOptions {
    supressWarnings: boolean;
}


export default class ReducerCreator {
    private _reducerNames = [] as string[];
    private _reactions = {} as { [actionType: string]: Reaction };
    private options: ReducerCreatorOptions;

    constructor(options: Partial<ReducerCreatorOptions> = {}) {
        this.options = Object.assign({
            supressWarnings: false
        }, options)
    }


    withBooleanReducer(name: string, booleanOptions?: BooleanReducerOptions) {
        const newReactions = getBooleanReducerActionTypeReactions(name, this.options, booleanOptions);
        this.addReactions(newReactions);
        this._reducerNames.push(name);
        return this;
    }

    withDictionaryReducer(name: string, dataObjectKeyName = 'id', dictionaryOptions?: DictionaryReducerOptions) {
        const newReactions = getDictionaryReducerActionTypeReactions(name, dataObjectKeyName, this.options, dictionaryOptions);
        this.addReactions(newReactions);
        this._reducerNames.push(name);
        return this;
    }

    withVariableReducer(name: string, variableOptions?: VariableReducerOptions) {
        const newReactions = getVariableReducerActionTypeReactions(name, this.options, variableOptions);
        this.addReactions(newReactions);
        this._reducerNames.push(name);
        return this;
    }

    withObjectReducer(name: string, objectOptions?: ObjectReducerOptions) {
        const newReactions = getObjectReducerActionTypeReactions(name, this.options, objectOptions);
        this.addReactions(newReactions);
        this._reducerNames.push(name);
        return this;
    }

    withArrayReducer(name: string, arrayOptions?: ArrayReducerOptions) {
        const newReactions = getArrayReducerActionTypeReactions(name, this.options, arrayOptions);
        this.addReactions(newReactions);
        this._reducerNames.push(name);
        return this;
    }

    setOptions(options: Partial<ReducerCreatorOptions>) {
        this.options = Object.assign({}, this.options, options)
    }

    addReaction(reactionName: string, reaction: Reaction) {
        this._reactions[reactionName] = reaction;
        return this;
    }

    addReactions(reactions: { [reactionName: string]: Reaction }) {
        Object.getOwnPropertyNames(reactions)
            .forEach(key => this.addReaction(key, reactions[key]));

        return this;
    }

    toReducer<StateModel>(initialState: StateModel, options?: ReducerOptions) {
        let cachingOptions: CachingOptions = {
            cacheName: options && options.cachingOptions && options.cachingOptions.cacheName ||
            `ReduxState_${this._reducerNames.join('_&_')}`,
            cacheMethod: options && options.cachingOptions && options.cachingOptions.cacheMethod || 'none'
        };

        addHelpReactionToReactionDictionary(this._reactions);
        const lastSaveState = readLastSavedState(cachingOptions);
        let reducer = createReducerWithInitialState(this._reactions, lastSaveState ?
            lastSaveState : initialState,
            this.options
        );

        reducer = addCachingToReducer(reducer, cachingOptions);

        return reducer;
    }
}