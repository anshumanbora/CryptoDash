# CryptoDash
#### About
This is a single page application which ranks cryptocurrencies according to the volume traded in the last 24 hours.
#### Link
[Coming Soon]
#### Interface walkthrough
The interface is divided between two sections.
1. The List
2. Currency Details

The list contains the currencies ranked in terms of volumne traded in the last 24 hours. The list could be reversed by clicking on the 'Volume Traded in 24 hours' header. When a currency is clicked on the list, it's details are displayed on the currency details section. 
#### Technology Stack
* HTML
* CSS (Bootstrap) 
* React JS

#### Data Source
The data have been sourced from API provided here: https://coinmarketcap.com/api/

##### API response object:
```
{
        "id": "bitcoin",
        "name": "Bitcoin",
        "symbol": "BTC",
        "rank": "1",
        "price_usd": "573.137",
        "price_btc": "1.0",
        "24h_volume_usd": "72855700.0",
        "market_cap_usd": "9080883500.0",
        "available_supply": "15844176.0",
        "total_supply": "15844176.0",
        "percent_change_1h": "0.04",
        "percent_change_24h": "-0.3",
        "percent_change_7d": "-0.57",
        "last_updated": "1472762067"
    }
```
