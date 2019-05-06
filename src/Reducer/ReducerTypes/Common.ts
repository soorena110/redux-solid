export interface BaseReducerOptions {
    _notYet_events?: {
        onBefore?: never;
        onThen?: never;
    }
    _notYet_shouldLog?: never;
    expiration?: {
        timeout: number;
    }
}


export const OnlyOneExists = (...params: any) => params.filter((p: any) => p).length == 1;