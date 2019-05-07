import { ArrayReducerOptions, BooleanReducerOptions, CachingOptions, DictionaryReducerOptions, ObjectReducerOptions, Reaction, VariableReducerOptions } from "./Common/Models";
interface ReducerOptions {
    cachingOptions?: Partial<CachingOptions>;
}
export interface ReducerCreatorOptions {
    supressWarnings: boolean;
}
export default class ReducerCreator {
    private _reducerNames;
    private _reactions;
    private options;
    constructor(options?: Partial<ReducerCreatorOptions>);
    withBooleanReducer(name: string, booleanOptions?: BooleanReducerOptions): this;
    withDictionaryReducer(name: string, dataObjectKeyName?: string, dictionaryOptions?: DictionaryReducerOptions): this;
    withVariableReducer(name: string, variableOptions?: VariableReducerOptions): this;
    withObjectReducer(name: string, objectOptions?: ObjectReducerOptions): this;
    withArrayReducer(name: string, arrayOptions?: ArrayReducerOptions): this;
    setOptions(options: Partial<ReducerCreatorOptions>): void;
    addReaction(reactionName: string, reaction: Reaction): this;
    addReactions(reactions: {
        [reactionName: string]: Reaction;
    }): this;
    toReducer<StateModel>(initialState: StateModel, options?: ReducerOptions): (state: any, action: any) => any;
}
export {};
