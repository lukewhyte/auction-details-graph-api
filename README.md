# Jalopy SuperRare Auction Details API

For testing, you should be able to find all live auctions on SR [here](https://superrare.com/explore?artwork-options=%257B%2522liveAuction%2522%3Atrue%257D).

## Query spec

### Argument

 - `artworkUrl`: Should be a SuperRare artwork page url like [this one](https://superrare.com/0xca53bb6cdfcd5bf437bf4ac6d17c3b0e67d8a83e/corroded-abbey:-sailor's-offering-11).

### Fields

 - `bidder`: High bidder's address
 - `currencyAddress`: Bid currency address
 - `amount`: Bid amount in currency (usually ETH... might be $RARE)
 - `marketplaceFee`: SR's cut
 - `contract`: Contract address
 - `tokenId`: Token ID on contract
 - `auctionCreator`: Owner address
 - `startingTime`: When the auction started
 - `lengthOfAuction`: How long the auction will run
 - `auctionType`: `'scheduled' | 'reserve' | 'unknown'

## To run the API locally...

Install the dependency then run `npm run dev` and the Apollo explorer should serve at `http://localhost:4000`
