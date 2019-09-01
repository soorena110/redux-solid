# Redux SOLID

If you have read SOLID in [Object Orient Design (OOD)](https://en.wikipedia.org/wiki/SOLID), then you know than there is a rule that says `A class or a function should do single responsible.` This rule is `Single Responsibility`.

There are also some rules in [Clean Code](https://github.com/ryanmcdermott/clean-code-javascript) that say `A function or class name should be what it does. It should never say why is called or used.` But redux culture (how redux users use it) violate these rules. :((

The result of this violation is to write repetitive codes in reducers or other parts of play (also DRY violation). Redux code duplication make programmers cry and anger (and in some cases they change their job, not to be programmer any more !!! :P)

So redux-solid is a middle ware to change culture of redux beside preventing these rules violation.

The idea is to say what we want and how reducer should behavior, instead of writing more code which is always duplicated with little change.

## How it works ;))


See the example code below ↓

**Bad Code :**
```js
const employeeReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'RequestEmployee_Start':
            ... break;
        case 'RequestEmployee_Cancled':
            ... break;
        case 'RequestEmployee_Cancling':
            ... break;
        case 'RequestEmployee_Succeed':
            ... break;
        case 'RequestEmployee_Failed':
            ... break;
        case 'RequestEmployee_Done':
            ... break;
        // repeat this pattern for 'SetEmployeeActive', 'ChangeEmployee',  'CreateEmployee',
        // 'SetEmployeeList', 'CreateEmployeeList', 'ChangeEmployeeList',
        // 'DeleteEmployee', 'DeleteEmployeeList'
    }
}

```
Consider in this example for each request we should write the code. But what we suggest is :
```js
const employeeReducer = new ReducerCreator()
    .withDictionaryReducer('Employee', 'keyInDictionary', {
        // some configue
    }).toReducer()
```
which will create a reducer like ↓
```js
const employeeReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'Add_Employee':
            ... break;
        case 'AddOrReplace_Employee':
            ... break;
        case 'AddOrMerge_Employee':
            ... break;
        case 'Remove_Employee':
            ... break;
        case 'Replace_Employee':
            ... break;
        case 'Merge_Employee':
            ... break;
        case 'Flag_Employee':
            ... break;
        case 'Unflag_Employee':
            ... break;

        // and many other cases :))
    }
}
```

then we will have reduecer which need to say what they do instead of why they do (and don't violate rules.) For example consider that we want to **RequestEmployee_Start** sets a flag on to prevent multiple requests, so in new reducer we should dispatch **"Flag_Employee"** with a key. When request succeed, **RequestEmployee_Succeed** is dispatched, which dispatches both **AddOrReplace_Employee** and **Unflag_Employee**.

There is still a problem! It hurts performance. To solve this problem we need to use [redux-multi](https://www.npmjs.com/package/redux-multi), which helps us to dispatch more than one actions with single component refresh due to optimization.

```
dispatch([action1,action2])
```

## Installation

```
npm install redux

npm install redux-solid
```

You may also need to install [redux-multi](https://www.npmjs.com/package/redux-multi) to dispatch more than one action with single component refresh due to optimization.

```
npm install redux-multi
```

## Usage
`ReduxSolid` is created to solve many problems, however it only creates reducers by now.
### ReducerCreator
This is the name of class which creates reducer, what we saw in previous example.

```js
const reducerCreator = new ReducerCreator(reducerOptions);

//... add some sub reducers

const rootReducer = combineReducers({
    myReducer: reducerCreator .toReducer(initialState)
});

```
This code creates an empty reducer and you'll need to add some sub-reducer to your store. as you know, to reference `myReducer`, we should use `state.myReducer`.

We have several sub-reducer types as explained in future. Think that we want to add a arrayReducer, so we add below codes ↓

```js
reducerCreator.withArrayReducer('Employee', {
        // some configue
    })
```

and now we have reducer with action types `Add_Employee`, `Remove_Employee`, `Replace_Employee`, `Push_Employee`,  `Pop_Employee` & etc. To access value we should use `state.myReducer.Employee`. To see all action available, you can `dispatch({type:'Help'})` to see help or you can also `dispatch({type:'Help_Employee'})` to see all available action type of `Employee` and what they do.

### a. sub-reducer types

There are several types for sub-reducers. Assume that our store needs CRUD operations (Create, Read, Update, Delete) and now we are defining them in reducer. In redux we have array, dictionary (object with specified keys and their values), primitive variables, so our reducers must support these types.

#### ArrayReducer
An array reducer, assumes an array field and defines CRUD operation regarding array operation in JavaScript.

```js
reducerCreator.withArrayReducer('Employee', {
        // some array reducer configue
    })
```
This code creates a reducer with below action types :
* `Set_Employee` :
Sets `action.value` instead of the related array. `action.value` must be the item(s).
* `Push_Employee` :
Pushes an item or items into the end of related redux array. action.value must be the item(s).
* `Push/Ignore_Employee` :
Pushes an item or items into the end of related redux array, however checks all of the array items not to be duplicated. `action.value` must be the item(s).
* `ReversePush_Employee` :
Pushes an item or items into the beginning of related redux array. `action.value` must be the item(s).
* `ReversePush/Ignore_Employee` :
Pushes an item or items into the beginning of related redux array, however checks all of the array items not to be duplicated. action.value must be the item(s).
* `Add_Employee` :
is as same as `Push_Employee`.
* `Remove_Employee` :
removes an item or items from the related redux array. Either action.index or `action.value` must be filled. `action.index` is the index(es) of item(s) to be removed. `action.value` is the item(s) to be removed
* `RemoveLast_Employee` :
Remove the last item from the related redux array. is good when using array as stack, because is similar to `Pop` method in stack.
* `RemoveFirst_Employee` :
Remove the last item from the related redux array. Is good when using array as Queue, because is similar to `Dequeue` method in Queue.
* `Clear_Employee` :
Clears the related redux array ([] is the result !).



#### DictionaryReducer

In optimization Dictionary has a great advantage rather than array. Assume that we have a big list (for example with 1000 items) that rarely items are added or removed, but list items are changing quickly, in this case is better to use a dictionary and the list is rendering items by keys and these keys don't change and items in this list is redux-connected components that are bound to their related data from that dictionary.

For example we have a dictionary like below :

```js

employee = {
	'first' : {id:'first', name:'mohammadreza', family:'azarang', salary:200000},
	'second' : {id:'second', name:'mohammad', family:'dehghan', salary:200000},
	'third' : {id:'third', name:'masoud', family:'ghadiri', salary:200000}
}

```

To have an optimized user interface, we must have a list that refreshes by whole dictionary object change. so `mapStateToProps` function in `react-redux` for list component will return the dictionary. This component will render item components that get `id` from `ownProps` (refer to react-redux docs). Now each item component is connected to `employee[ownProps.id]`, so with changing any employee, only the item would rerender and the other component won't.

Now in dictionary reducer we just write below code :

```js
reducerCreator.withDictionaryReducer('Employee', {
        // some dictionary reducer configue
    })
```

This code creates a reducer with below action types :
* `Set_Employee` :
Creates new dictionary and pushes key-value-data(s) into it.
`key-value-data` is described at the end.
* `Add/Replace_Employee` :
Adds an `key-value-data` to the related redux dictionary, however, if any item has duplicated key, replaces it.
`key-value-data` is described at the end.'
* `Add_Employee` :
It is as same as `Add/Replace_Employee`.
* `Add/Ignore` :
Adds an `key-value-data` to the related redux dictionary.
however, if any item has duplicated key, ignore it (does nothing for that item).
`key-value-data` is described at the end.
* `Add/Merge_Employee` :
Adds an `key-value-data` to the related redux dictionary.
however, if any item has duplicated key, merge it with same-key-data.
`key-value-data` is described at the end.
* `Replace_Employee` :
Replaces an `key-value-data` to the same-key-data(s) the related redux dictionary.
* `Merge_Employee` :
Merges an `key-value-data` to the same-key-data(s) the related redux dictionary.
* `Remove_Employee` :
Removes an item or items of related redux array.
`action.key` must be filled and is the key(s) of item(s) to be removed.
`action.key` can number or string or array of number or array of string.
* `Clear_Employee` :
Set the related redux array to empty array.

In these action types, `key-value-data` can be passed in three ways:

* both of `action.key` and `action.value`, `action.key` can be either string or number

* `action.keyValue` one of three below ways :
    * { key, value} as a `key-value` object
    * { key, value}[] as array of `key-value` objects
    * { [key]: data } as a dictionary (each property of this object is a `key-value`).
for all of theme `action.key` can be either string or number.
* `action.data` data must have a <dataObjectKeyName> of the object (according to `.withDictionaryReducer` second argument).
    * data can also be an array of described object.

// todo reducer options

#### VariableReducer
A variable reducer, assumes an variable field and defines only `Set` or maybe `Clear` operation. It is a simple reducer.

```js
reducerCreator.withVariableReducer('Employee', {
        // some variable reducer configue
    })
```

This code creates a reducer with below action types :

* `Set_Employee` :
Sets the related data to `action.value`.
if in variable reducer option `notUndefined` is true, then `action.value` can not be undefined, otherwise you get error.
* `Clear_Employee` : Sets the related data to `undefined`.
This does not exist if in variable reducer option `notUndefined` is true.



#### ObjectReducer

An object reducer, is as same as a variable reducer, with only one more action type. This Action type is to merge.

```js
reducerCreator.withObjectReducer('Employee', {
        // some object reducer configue
    })
```

This code creates a reducer with below action types :

* `Set_Employee` :
Sets the related data to `action.value`.
if in variable reducer option `notUndefined` is true, then `action.value` can not be undefined, otherwise you get error.
* `Clear_Employee` : Sets the related data to `undefined`.
This does not exist if in variable reducer option `notUndefined` is true.
* `Merge_Employee` : Merges the related data with `action.value`.




#### BooleanReducer

A boolean reducer, assumes a boolean field. You can set it to a value, true, false, toggle, undefined.

```js
reducerCreator.withBooleanReducer('Employee', {
        // some boolean reducer configue
    })
```


* `Set_Employee` :
Set value without looking to previous data.
`action.value` must be a boolean (True or False) or undefined if if in variable reducer option `notUndefined` is true, otherwise you get error.
* `Clear_Employee` : Sets the related redux value to `undefined`.
This does not exist if in variable reducer option `notUndefined` is true.
* `Toggle_Employee` : Toggle the related redux boolean value.
* `True_Employee` : Sets the related value to `True`.
* `False_Employee` : Sets the related value to `False`.





#### FlagReducer
// todo

### b. Reducer options
### c. Other methods
### d. Common action types
There is a `reset` action type that is used to reset actions to initial state.
ReducerCreator stores clone of the initial state to prevent reference type changes and reset to the beginning state whenever you need it. 
```js
store.dispatch('reset'); // reset to initial state.
```



No difference there is between lower case or upper case action.type prefixes.
For example if action.type is ```'reset'```, ```'Reset'``` or ```'RESET'``` it works well.
But remember, ```'reset_employee'``` is different to ```'reset_Employee'``` (`employee` with `E`)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

### Also star my project in gitHub if you like it ;))
