import {FlagActionTypes} from "../../../Models/ActionTypes";

export const getFlagHelpReaction = (actionTypes: FlagActionTypes[], name: string) => {
    return (state: any) => {
        const availableActions = actionTypes.map(at => {
            switch (at) {
                case 'Flag':
                    return `\x1b[33m→ ${at}_${name}\x1b[37m : ` + 'activates flag with entered key.\n' +
                        '   * action.value must be the item(s).';
                case 'Unflag':
                    return `\x1b[33m→ ${at}_${name} \x1b[37m ` + 'deactivates flag with entered key.\n' +
                        '   * action.value must be the item(s).';
            }
        });


        console.log('%cAvailable action types for \x1b[33m' + name + '\x1b[37m are :%c\n' + availableActions.join('\n'),
            'color:#0099FF', '');

        return state;
    };
};
