export interface StockWatchInfo {
    isin: string;
    name: string;
    companyName: string;
    closing: number;
    downRangeCount: number;
    event: string;
    first: number;
    high: number;
    last: number;
    lastTrade: string;
    low: number;
    max: number;
    min: number;
    referencePrice: number;
    state: null
    tradeValue: number;
    tradeVolume: number;
    tradesCount: number;
    upRangeCount: number;


    lastVariation: number;
    lastVariationPercentage: number;
    closingVariation: number;
    closingVariationPercentage: number;
}