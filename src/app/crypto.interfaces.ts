export interface AssetsResponse {
  data: Asset[]
}

export interface AssetResponse {
  data: Asset
}

export interface AssetHistoryResponse {
  data: History[]
}

export interface AssetMarketResponse {
  data: Market[]
}

export interface Asset {
  id:                string;
  rank:              string;
  explorer:          string;
  symbol:            string;
  name:              string;
  supply:            number;
  maxSupply:         number;
  marketCapUsd:      number;
  volumeUsd24Hr:     number;
  priceUsd:          number;
  changePercent24Hr: number;
  vwap24Hr:          number;
}

export interface History {
  priceUsd: string;
  time:     Date
}

export interface Market {
  exchangeId:    string;
  baseId:        string;
  quoteId:       string;
  baseSymbol:    string;
  quoteSymbol:   string;
  volumeUsd24Hr: string;
  priceUsd:      string;
  volumePercent: string;
}