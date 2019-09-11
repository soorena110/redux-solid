import {addSetStateToReducer, ReducerCreator} from "../";
import monitorReducerEnhancer from "../ReducerCreator/ReduxLogger";
import {combineReducers, createStore} from "redux";

const a = new ReducerCreator()
    .withBooleanReducer('bool', {notUndefined: true, preventUnchangedDispatch: false})
    .withDictionaryReducer('logic', 'id', {
        isArrayDictionary: true,
        cachingOptions: {
            cacheMethod: 'localStorage'
        }
    }).withObjectReducer('obj')
    .withFlagReducer('obj')
    .withVariableReducer('str')
    .withArrayReducer('arr');

const b = new ReducerCreator()
    .withVariableReducer('var1')
    .withVariableReducer('var2')
    .withVariableReducer('var3')
    .withVariableReducer('var4');

const rootReducer = combineReducers({
    a: a.toReducer({arr: [1, 2, 3]}, {}),
    b: b.toReducer({}, {cachingOptions: {cacheMethod: "localStorage"}})
});


const reducer = addSetStateToReducer(rootReducer);
const store = createStore(reducer, undefined, monitorReducerEnhancer as any);

(window as any).$store = store;
export default store;


setTimeout(startFunc, 1000);


function startFunc() {

}

// setInterval(() => {
//     store.dispatch({
//         type: 'Add_dict',
//         key: 'sss' + Math.random(),
//         value: 'ttt'
//     });
//     console.log(store.getState())
// }, 1000);