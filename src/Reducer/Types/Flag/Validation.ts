export const checkValidationOfFlagAction = (action: any) => {
    if (['Flag', 'Unflag'].find(command => action.type.startsWith(command))) {
        if (typeof action.key != 'string')
            return 'For `redux_flag` type, for action.type equal to `' + action + '`, ' +
                'action.key must be a string an can not be `undefined`.';
    }
};