import {ReducerCreator} from "../";
import monitorReducerEnhancer from "../Reducer/ReduxLogger";
import {combineReducers, createStore} from "redux";

const a = new ReducerCreator()
    .withBooleanReducer('bool', {notUndefined: true, preventUnchangedDispatch: false})
    .withDictionaryReducer('dict', 'key', {isArraDictionary: true})
    .withObjectReducer('obj')
    .withVariableReducer('str')
    .withArrayReducer('arr');

const rootReducer = combineReducers({
    a: a.toReducer({}, {
        cachingOptions: {cacheMethod: "localStorage"}
    })
});


const store = createStore(rootReducer, undefined, monitorReducerEnhancer as any);

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
// }, 1000);