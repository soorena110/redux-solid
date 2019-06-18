import {ReducerCreator} from "../";
import monitorReducerEnhancer from "../Reducer/ReduxLogger";
import {combineReducers, createStore} from "redux";

const a = new ReducerCreator()
    .withBooleanReducer('bool', {notUndefined: true, preventUnchangedDispatch: false})
    .withDictionaryReducer('logic', 'id', {isArrayDictionary: true, events: {onReducing: e => console.log(e)}})
    .withObjectReducer('obj')
    .withFlagReducer('obj')
    .withVariableReducer('str')
    .withArrayReducer('arr');

const rootReducer = combineReducers({
    a: a.toReducer({}, {})
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
//     console.log(store.getState())
// }, 1000);