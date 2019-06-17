# Redux SOLID  ;))

If you have read SOLID in Object Orient Design (OOD), then you know than there is a rule that says `A class or a function should do single responsible.` This rule is `Single Responsibility`.

There are also some rules in `Clean Code` that say `A function or class name should be what it does. It should never say why is called or used.` But redux culture (how redux users use it) violate these rules. :((

The result of this violation is to write repetitive codes in reducers or other parts of play (also DRY violation). Redux code duplication make programmers cry and anger (and in some cases they change their job, not to be programmer any more !!! :P)

So redux-solid is a middle ware to change culture of redux beside preventing these rules violation.

The idea is to say what we want and how reducer should behavior, instead of writing more code which is always duplicated with little change.

## How it works


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
const employeeReducer= new ReducerCreator()
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

then we will have reduecer which need to say what they do instead of why they do (and don't violate rules.) For example consider that we want to **RequestEmployee_Start** sets a flag on to prevent multiple requests, so in new reducer we should dispatch **"Flag_Employee"** with a key. When request succeed, **RequestEmployee_Succeed** is dispatched, which dispatches both **AddOrReplace_Employee** and **Unflag_Employee**. There is still a problem! It hurts performance. To solve this problem we need to use [redux-multi](https://www.npmjs.com/package/redux-multi), which helps us to dispatch more than one actions with single component refresh due to optimization.

```
dispatch([action1,action2])
```

## Installation

```
npm install redux-solid
```
You may also need to install [redux-multi](https://www.npmjs.com/package/redux-multi) to dispatch more than one action with single component refresh due to optimization.

```
npm install redux-multi
```

## Usage

```python
import foobar

foobar.pluralize('word') # returns 'words'
foobar.pluralize('goose') # returns 'geese'
foobar.singularize('phenomena') # returns 'phenomenon'
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
