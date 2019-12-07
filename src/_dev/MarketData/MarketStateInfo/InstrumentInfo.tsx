export interface InstrumentInfo {
    id: string;
    name: string;
    marketName: string;
    baseVolume: number;

    sector: {
        code: string;
        name: string;
    }
}