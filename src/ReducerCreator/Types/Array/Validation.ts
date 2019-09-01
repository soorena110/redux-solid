import {onlyOneExists} from "../_Common";

export const checkValidationOfArrayAction = (action: any) => {
    if (['Set', 'Add', 'Push', 'ReversePush', 'Push/Ignore', 'ReversePush/Ignore']
        .find(command => action.type.startsWith(command))) {
        if (action.value == undefined)
            return 'For `redux_array` type, action.value can not be `undefined`, it can be an array or an item';
    }
    else if (action.type.startsWith('Remove')) {
        if (!onlyOneExists(action.value != undefined, action.index != undefined))
            return 'You can only use one of below properties for action.type `' + action.type + '` :\n' +
                '   → action.value equal to an item to remove or an array of items to remove.\n' +
                '   → action.index equal to index of an item to remove or an array of index of items to remove..\n';
        if (action.index != undefined) {
            if (Array.isArray(action.index)) {
                if (action.find((a: any) => typeof a != 'number'))
                    return 'For `redux_array` type, action.index as array must be of type number[] (array of index)';
            }
            else if (typeof action.index != 'number')
                return 'For `redux_array` type, action.index must be of type one of below :\n' +
                    '   → number (an index)\n' +
                    '   → number[] (array of index)';
        }
    }
    else if (['RemoveLast', 'RemoveFirst', 'Clear']
        .find(command => action.type.startsWith(command))) {
        // do nothing yet
    }
};