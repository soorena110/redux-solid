export interface BaseReducerOptions {
    _notYet_events?: {
        onBefore?: never;
        onThen?: never;
    };
    _notYet_shouldLog?: never;
    expiration?: {
        timeout: number;
    };
}
export declare const OnlyOneExists: (...params: any) => boolean;
