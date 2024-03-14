import gql from 'graphql-tag';

const typeDefs = gql`
  type Query {
    auctions(artworkUrl: String!): [Auction]!
  }

  enum AuctionTypes {
    reserve
    scheduled
    unknown
  }

  type Auction {
    bidder: String
    currencyAddress: String
    amount: String
    marketplaceFee: Int
    contract: String!
    tokenId: Int!
    auctionCreator: String!
    startingTime: Int!
    lengthOfAuction: Int!
    auctionType: AuctionTypes!,
  }
`

export default typeDefs