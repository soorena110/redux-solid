import {ArrayActionTypes} from "../../Common/Models";
import {onlyOneExists} from "../../HelpAndValidation/_Common";

export const getArrayHelpReaction = (actionTypes: ArrayActionTypes[], name: string) => {
    return (state: any) => {
        const availableActions = actionTypes.map(at => {
            switch (at) {
                case 'Set':
                    return `\x1b[33m→ ${at}_${name}\x1b[37m : ` + 'clears the the related array and pushes `action.value` into it.\n' +
                        '   • action.value must be the item(s).';
                case 'Push':
                    return `\x1b[33m→ ${at}_${name} \x1b[37m ` + 'pushes an item or items into the end of related redux array.\n' +
                        '   • action.value must be the item(s).';
                case 'Push/Ignore':
                    return `\x1b[33m→ ${at}_${name} \x1b[37m ` + 'pushes an item or items into the end of related redux array,\n' +
                        '   However checks all of the array items not to be duplicated.\n' +
                        '   • action.value must be the item(s).';
                case 'ReversePush':
                    return `\x1b[33m→ ${at}_${name} \x1b[37m ` + 'pushes an item or items into the beginning of related redux array.\n' +
                        '   • action.value must be the item(s).';
                case 'ReversePush/Ignore':
                    return `\x1b[33m→ ${at}_${name} \x1b[37m ` + 'pushes an item or items into the beginning of related redux array,\n' +
                        '   However checks all of the array items not to be duplicated.\n' +
                        '   • action.value must be the item(s).';
                case 'Add':
                    return `\x1b[33m→ ${at}_${name} \x1b[37m is as same as Push_${name}`;
                case 'Remove':
                    return `\x1b[33m→ ${at}_${name} \x1b[37m ` + 'removes an item or items from the related redux array.\n' +
                        '   Either action.index or action.value must be filled.\n' +
                        '   • action.index is the index(es) of item(s) to be removed.\n' +
                        '   • action.value is the item(s) to be removed';
                case 'RemoveLast':
                    return `\x1b[33m→ ${at}_${name} \x1b[37m ` + 'remove the last item from the related redux array.\n' +
                        '   • is good when using array as stack, because is similar to `Pop` method in stack.';
                case 'RemoveFirst':
                    return `\x1b[33m→ ${at}_${name} \x1b[37m ` + 'remove the last item from the related redux array.\n' +
                        '   • is good when using array as Queue, because is similar to `Dequeue` method in Queue.';
                case 'Clear':
                    return `\x1b[33m→ ${at}_${name} \x1b[37m ` + 'clears the related redux array ([] is the result !).';
                default:
                    const exhaustiveCheck: never = at;
            }
        });


        console.log('%cAvailable action types for \x1b[33m' + name + '\x1b[37m are :%c\n' + availableActions.join('\n'),
            'color:#0099FF', '');

        return state;
    };
};

export const checkValidationOfArrayAction = (action: any) => {
    if (['Set', 'Add', 'Push', 'ReversePush', 'Push/Ignore', 'ReversePush/Ignore']
        .find(command => action.type.startsWith(command))) {
        if (action.value == undefined)
            return 'For `redux_array` type, action.value can not be `undefined`, it can be an array or an item';
    }
    else if ('Remove') {
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
};