import {FlagActionTypes} from "../ActionTypes";

export interface FlagActionType {
    command: FlagActionTypes;
    entity: string;
    key: string;
}