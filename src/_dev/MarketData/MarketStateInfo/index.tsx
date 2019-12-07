import {StockWatchInfo} from "./Stockwatch";
import {InstrumentInfo} from "./InstrumentInfo";


export default interface MarketStateInfo {
    StockWatchs: { [isin: string]: StockWatchInfo };
    Instruments: { [isin: string]: InstrumentInfo };
}

