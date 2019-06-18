import {onlyOneExists} from "../_Common";

export const checkValidationOfDictionaryAction = (action: any, dataObjectKeyName: string) => {
    if (['Set', 'Add', 'Add/Ignore', 'Add/Replace', 'Add/Merge', 'Replace', 'Merge']
        .find(command => action.type.startsWith(command))) {
        if (!onlyOneExists(action.key != undefined && action.value != undefined, action.keyValue, action.data != undefined))
            return 'You can only use one of below properties for action.type `' + action.type + '` :\n' +
                '   → action.key as string or number & action.value as any.\n' +
                '   → action.keyValue that can be of type one of below types :\n' +
                '   * { key: string | number, value: any } (key of type string or number)\n' +
                '   * { key: string | number, value: any }[] (key of type string or number)\n' +
                '   * { [key: string | number]: any } (a dictionary with key of type string or number)' +
                '   → action.data that is the data(s) which is going to be stored :\n' +
                '   * this can be as array of data.\n' +
                '   * it should have key property that is "id" by default.';

        if (action.key != undefined) {
            if (typeof action.key != 'string' && typeof action.key != 'number')
                return 'For `redux_dictionary` type, action.key must be string or number.';
            if (action.value == undefined)
                return 'For `redux_dictionary` type, action.key must be beside of action.value.';
        }
        else if (action.keyValue) {
            if (typeof action.keyValue.key != 'string' && typeof action.keyValue.key != 'number')
                return 'For `redux_dictionary` type, action.keyValue.key must be string or number.';
            if (action.keyValue.value == undefined)
                return 'For `redux_dictionary` type, action.keyValue.key must be beside of action.keyValue.value.';
            if (Array.isArray(action.keyValue)) {
                if (action.keyValue.find((kv: any) => !action.keyValue[kv] ||
                    typeof action.keyValue[kv].key != 'string' && typeof action.keyValue[kv].key != 'number' ||
                    action.keyValue[kv].key != undefined && action.keyValue[kv].value == undefined
                ))
                    return 'For `redux_dictionary` type, action.keyValue as array must be of ' +
                        'type array of {key:string | number, value:any}. (key of type string or number)';
            }
        }
        else if (action.data) {
            if (Array.isArray(action.data)) {
                if (action.data.find((d: any) => !d[dataObjectKeyName]))
                    return 'For `redux_dictionary` type, action.data can be array of data,' +
                        '\but each array item must have property with name <dataObjectKeyName>.\n' +
                        '* <dataObjectKeyName> is defined when creating the reducer.' +
                        '* <dataObjectKeyName> value is `id` by default'
            }
            else if (!action.data[dataObjectKeyName])
                return 'For `redux_dictionary` type, action.data can be object,' +
                    'but must property with name <dataObjectKeyName>.\n' +
                    '* <dataObjectKeyName> is defined when creating the reducer.' +
                    '* <dataObjectKeyName> value is `id` by default'
        }
    }
    else if (action.type.startsWith('Remove')) {
        if (action.key == undefined)
            return 'For `redux_dictionary` to remove an item, actions should have key';

        if ((typeof action.key != 'string' && typeof action.key != 'number' &&
            (!Array.isArray(action.key) ||
                action.find((a: any) => a != 'string' && typeof a != 'number'))))
            return 'For `redux_dictionary` type, action.key as array only must be of type one of below :\n' +
                '   → string\n' +
                '   → number\n' +
                '   → string[] (array of string)\n' +
                '   → number[] (array of number)';
    }
};