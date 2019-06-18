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

There are several types for sub-reducers.
#### ArrayReducer
#### DictionaryReducer
#### VariableReducer
#### ObjectReducer
#### BooleanReducer
#### FlagReducer

#### b. reducer options
#### c. other methods

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

### Also star my project in gitHub if you like it ;))
