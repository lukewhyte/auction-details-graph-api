import { Address } from "viem"
import getAuctionDetails, { AuctionDetails } from "../bazaar-interfaces/getAuctionDetails"
import { logger } from "../winston"
import getAuctionBids, { AuctionBids } from "../bazaar-interfaces/getAuctionBids"
import { deconstructArtworkPageUrl } from "./utils"

type Auction = AuctionDetails & AuctionBids

const NO_BID = {
  bidder: null,
  currencyAddress: null,
  marketplaceFee: null,
  amount: null,
}

const auctionResolver = {
  Query: {
    auctions: async (
      _: any,
      args: {
        artworkUrl: string,
      }
    ): Promise<Auction[]> => {
      try {
        const { tokenId, contractUrl } = deconstructArtworkPageUrl(args.artworkUrl)

        if (!tokenId || !contractUrl) {
          return []
        }

        const auctionDetails = await getAuctionDetails(contractUrl as Address, BigInt(tokenId))
        const auctionBids = await getAuctionBids(contractUrl as Address, BigInt(tokenId))

        if (!auctionDetails) {
          return []
        }

        const auction = Object.assign(auctionDetails, auctionBids || NO_BID)

        return [auction]
      } catch(err) {
        logger.error(err)
        return []
      }
    }
  }
}

export default auctionResolver
