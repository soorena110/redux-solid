import {
    addHelpReactionToReactionDictionary,
    addResetToReactions,
    createReducerWithInitialState,
} from "./Functions/CreatingReducerFunctions";
import {
    ArrayReducerOptions,
    BaseReducerOptions,
    BooleanReducerOptions,
    CachingOptions,
    DictionaryReducerOptions,
    FlagReducerOptions,
    ObjectReducerOptions,
    Reaction,
    VariableReducerOptions
} from "../Models/ReducerModels";
import {getDictionaryReducerActionTypeReactions} from "./Types/Dictionary";
import {getBooleanReducerActionTypeReactions} from "./Types/Boolean";
import {getVariableReducerActionTypeReactions} from "./Types/Variable";
import {getObjectReducerActionTypeReactions} from "./Types/Object";
import {getArrayReducerActionTypeReactions} from "./Types/Array";
import {getFlagReducerActionTypeReactions} from "./Types/Flag";
import {addCachingToReducer, readLastSavedState} from "./utils/cacheUtils";

interface ReducerOptions {
    cachingOptions?: CachingOptions;
}

export interface ReducerCreatorOptions {
    supressWarnings: boolean;
}


export default class ReducerCreator {
    private _reducerNames = [] as string[];
    private _reactions = {} as { [actionType: string]: Reaction };
    private _options: ReducerCreatorOptions;
    private _reducersLastSavedState = {} as any;

    constructor(options: Partial<ReducerCreatorOptions> = {}) {
        this._options = Object.assign({
            supressWarnings: false
        }, options)
    }


    withBooleanReducer(name: string, booleanOptions?: BooleanReducerOptions) {
        const newReactions = getBooleanReducerActionTypeReactions(name, this._options, booleanOptions);
        this.addReactions(newReactions, booleanOptions);
        this._reducerNames.push(name);
        return this;
    }

    withDictionaryReducer(name: string, dataObjectKeyName = 'id', dictionaryOptions?: DictionaryReducerOptions) {
        const newReactions = getDictionaryReducerActionTypeReactions(name, dataObjectKeyName, this._options, dictionaryOptions);
        this.addReactions(newReactions, dictionaryOptions);
        this._reducerNames.push(name);
        return this;
    }

    withVariableReducer(name: string, variableOptions?: VariableReducerOptions) {
        const newReactions = getVariableReducerActionTypeReactions(name, this._options, variableOptions);
        this.addReactions(newReactions, variableOptions);
        this._reducerNames.push(name);
        return this;
    }

    withObjectReducer(name: string, objectOptions?: ObjectReducerOptions) {
        const newReactions = getObjectReducerActionTypeReactions(name, this._options, objectOptions);
        this.addReactions(newReactions, objectOptions);
        this._reducerNames.push(name);
        return this;
    }

    withArrayReducer(name: string, arrayOptions?: ArrayReducerOptions) {
        const newReactions = getArrayReducerActionTypeReactions(name, this._options, arrayOptions);
        this.addReactions(newReactions, arrayOptions);
        this._reducerNames.push(name);
        return this;
    }

    withFlagReducer(name: string, flagOptions?: FlagReducerOptions) {
        const newReactions = getFlagReducerActionTypeReactions(name, this._options, flagOptions);
        this.addReactions(newReactions, flagOptions);
        this._reducerNames.push(name);
        return this;
    }

    setOptions(options: Partial<ReducerCreatorOptions>) {
        this._options = Object.assign({}, this._options, options)
    }

    addReaction(reactionName: string, reaction: Reaction) {
        const prevReaction = this._reactions[reactionName];
        if (!prevReaction)
            this._reactions[reactionName] = reaction;
        else this._reactions[reactionName] = (state, action) => reaction(prevReaction(state, action), action);

        return this;
    }

    addReactions(reactions: { [reactionName: string]: Reaction }, options?: BaseReducerOptions) {
        Object.getOwnPropertyNames(reactions)
            .forEach(key => {
                const keyParts = key.split('_');
                keyParts[0] = keyParts[0].toLowerCase();
                const cacheName = keyParts.slice(1, keyParts.length).join('_');

                const cachingOptions: CachingOptions = {
                    cacheName: options && options.cachingOptions && options.cachingOptions.cacheName ||
                        `ReduxState_${cacheName}`,
                    cacheMethod: options && options.cachingOptions && options.cachingOptions.cacheMethod || 'none'
                };
                const newReaction = addCachingToReducer(reactions[key], cachingOptions);
                const cachedVal = readLastSavedState(cachingOptions);
                if (cachedVal)
                    this._reducersLastSavedState[cacheName] = cachedVal;

                this.addReaction(keyParts.join('_'), newReaction);
            });

        return this;
    }

    toReducer<StateModel>(initialState: StateModel, options?: ReducerOptions) {
        const cachingOptions: CachingOptions = {
            cacheName: options && options.cachingOptions && options.cachingOptions.cacheName ||
                `ReduxState_${this._reducerNames.join('_&_')}`,
            cacheMethod: options && options.cachingOptions && options.cachingOptions.cacheMethod || 'none'
        };

        addHelpReactionToReactionDictionary(this._reactions);
        addResetToReactions(this._reactions, initialState);

        const lastSaveState = readLastSavedState(cachingOptions);
        let reducer = createReducerWithInitialState(this._reactions, lastSaveState ?
            lastSaveState : {...initialState, ...this._reducersLastSavedState},
            this._options
        );

        reducer = addCachingToReducer(reducer, cachingOptions);

        return reducer;
    }
}