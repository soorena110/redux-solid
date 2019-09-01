import {
    addCachingToReducer,
    addHelpReactionToReactionDictionary,
    addResetToReactions,
    createReducerWithInitialState,
    readLastSavedState
} from "./Functions/CreatingReducerFunctions";
import {
    ArrayReducerOptions,
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

interface ReducerOptions {
    cachingOptions?: Partial<CachingOptions>;
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

    withFlagReducer(name: string, flagOptions?: FlagReducerOptions) {
        const newReactions = getFlagReducerActionTypeReactions(name, this.options, flagOptions);
        this.addReactions(newReactions);
        this._reducerNames.push(name);
        return this;
    }

    setOptions(options: Partial<ReducerCreatorOptions>) {
        this.options = Object.assign({}, this.options, options)
    }

    addReaction(reactionName: string, reaction: Reaction) {
        const prevReaction = this._reactions[reactionName];
        if (!prevReaction)
            this._reactions[reactionName] = reaction;
        else this._reactions[reactionName] = (state, action) => reaction(prevReaction(state, action), action);

        return this;
    }

    addReactions(reactions: { [reactionName: string]: Reaction }) {
        Object.getOwnPropertyNames(reactions)
            .forEach(key => {
                const keyParts = key.split('_');
                keyParts[0] = keyParts[0].toLowerCase();
                this.addReaction(keyParts.join('_'), reactions[key]);
            });

        return this;
    }

    toReducer<StateModel>(initialState: StateModel, options?: ReducerOptions) {
        let cachingOptions: CachingOptions = {
            cacheName: options && options.cachingOptions && options.cachingOptions.cacheName ||
                `ReduxState_${this._reducerNames.join('_&_')}`,
            cacheMethod: options && options.cachingOptions && options.cachingOptions.cacheMethod || 'none'
        };

        addHelpReactionToReactionDictionary(this._reactions);
        addResetToReactions(this._reactions, initialState);
        const lastSaveState = readLastSavedState(cachingOptions);
        let reducer = createReducerWithInitialState(this._reactions, lastSaveState ?
            lastSaveState : initialState,
            this.options
        );

        reducer = addCachingToReducer(reducer, cachingOptions);

        return reducer;
    }
}