import {addSetStateToReducer} from "../index";
import {combineReducers, createStore} from "redux";
import monitorReducerEnhancer from "../ReducerCreator/ReduxLogger";
import {marketReducer} from "./MarketData";

// const a = new ReducerCreator()
//     .withBooleanReducer('bool', {notUndefined: true, preventUnchangedDispatch: false})
//     .withDictionaryReducer('logic', 'id', {
//         isArrayDictionary: true,
//         cachingOptions: {
//             cacheMethod: 'localStorage'
//         }
//     }).withObjectReducer('obj')
//     .withFlagReducer('obj')
//     .withVariableReducer('str')
//     .withArrayReducer('arr');
//
// const b = new ReducerCreator()
//     .withVariableReducer('var1')
//     .withVariableReducer('var2')
//     .withVariableReducer('var3')
//     .withVariableReducer('var4');

const rootReducer = combineReducers({
    // a: a.toReducer({arr: [1, 2, 3]}, {}),
    // b: b.toReducer({}, {cachingOptions: {cacheMethod: "localStorage"}})
    market: marketReducer
});


const reducer = addSetStateToReducer(rootReducer);
const store = createStore(reducer, undefined, monitorReducerEnhancer as any);

(window as any).$store = store;
export default store;