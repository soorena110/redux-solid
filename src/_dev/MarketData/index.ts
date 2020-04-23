import defaultState from "./defaultState";
import {StockWatchInfo} from "./MarketStateInfo/Stockwatch";
import {ReducerCreator} from "../../index";

const stockWatch_addComputableVariables = (action: { data: StockWatchInfo[] }) => {
    (Array.isArray(action.data) ? action.data : [action.data]).forEach(sw => {
        if (sw.lastVariation == undefined && sw.last != undefined && sw.referencePrice != undefined)
            sw.lastVariation = (sw.last - sw.referencePrice);

        if (sw.closingVariation == undefined && sw.closing != undefined && sw.referencePrice != undefined)
            sw.closingVariation = (sw.closing - sw.referencePrice);

        if (sw.lastVariationPercentage == undefined && sw.lastVariation != undefined && sw.referencePrice)
            sw.lastVariationPercentage = Math.round(sw.lastVariation * 10000 / sw.referencePrice) / 100;

        if (sw.closingVariationPercentage == undefined && sw.closingVariation != undefined && sw.referencePrice)
            sw.closingVariationPercentage = Math.round(sw.closingVariation * 10000 / sw.referencePrice) / 100
    });
};

export const marketReducer = new ReducerCreator()
    .withDictionaryReducer('Instruments', 'id', {
        recreateDictionaryOnObjectChange: false,
        cachingOptions: {cacheMethod: 'localStorage'}
    })
    .withDictionaryReducer('StockWatchs', 'isin', {
        recreateDictionaryOnObjectChange: false,
        events: {onReducing: e => stockWatch_addComputableVariables(e.action)}
    })
    .withMapReducer('myMap', 'isin', {
        recreateMapOnObjectChange: false,
        cachingOptions: {cacheMethod: 'localStorage'}
    })
    .withMapReducer('myMap2', 'id', {
        recreateMapOnObjectChange: false,
        events: {onReducing: e => stockWatch_addComputableVariables(e.action)}
    })
    .toReducer(defaultState);