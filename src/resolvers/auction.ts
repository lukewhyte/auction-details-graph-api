import { Address } from "viem"
import getAuctionDetails, { AuctionDetails } from "../bazaar-interfaces/getAuctionDetails"
import { logger } from "../winston"
import getAuctionBids, { AuctionBids } from "../bazaar-interfaces/getAuctionBids"

type Auction = AuctionDetails & AuctionBids

const V2 = '0xb932a70A57673d89f4acfFBE830E8ed7f75Fb9e0'

const isV2 = (contractAddress: string) => contractAddress === 'artwork-v2'

const isAddress = (contractAddress: string) => contractAddress.startsWith('0x')

const getToken = (tokenStr: string | undefined) => {
  if (!tokenStr) {
    return null
  }

  const last = tokenStr.split('-').pop()
  const token = parseInt(last, 10)
  return isNaN(token) ? null : token
}

const convertV2 = (contractAddress: string) => {
  return isV2(contractAddress) ? V2 : contractAddress
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

        const [_, contractAddress, tokenStr] = args.artworkUrl.slice('https://'.length).split('/')

        if (!contractAddress || (!isV2(contractAddress) && !isAddress(contractAddress))) {
          logger.error(`Unrecognized contractAddress: ${contractAddress}`)
          return []
        }

        const tokenId = getToken(tokenStr)

        if (!tokenId) {
          logger.error(`Unrecognized tokenId: ${tokenStr}`)
          return []
        }

        const auctionDetails = await getAuctionDetails(convertV2(contractAddress) as Address, BigInt(tokenId))
        const auctionBids = await getAuctionBids(convertV2(contractAddress) as Address, BigInt(tokenId))

        if (!auctionDetails || !auctionBids) {
          return []
        }

        return [Object.assign(auctionDetails, auctionBids)]
      } catch(err) {
        logger.error(err)
        return []
      }
    }
  }
}

export default auctionResolver
