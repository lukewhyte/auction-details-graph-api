import { Address } from 'viem'
import getAuctionDetailsAbi from './abis/getAuctionDetails'
import client, { BAZAAR } from './client'
import { logger } from '../winston'

export interface AuctionDetails {
  contract: string
  tokenId: number
  auctionCreator: string
  startingTime: number
  lengthOfAuction: number
  auctionType: string,
}

const getAuctionDetails = async (contract: Address, tokenId: bigint): Promise<AuctionDetails | null> => {
  try {
    const data = await client.readContract({
      address: BAZAAR,
      abi: getAuctionDetailsAbi,
      functionName: 'getAuctionDetails',
      args: [contract, tokenId]
    })

    if (!data.length) {
      return null
    }

    const [
      auctionCreator,
      creationBlock,
      startingTime,
      lengthOfAuction,
      currencyAddress,
      minimumBid,
      auctionType,
      splitRecipients,
      splitRatios,
    ] = data

    return {
        contract,
        tokenId: Number(tokenId),
        auctionCreator,
        startingTime: Number(startingTime),
        lengthOfAuction: Number(lengthOfAuction),
        auctionType,
    }
  } catch(err) {
    logger.error(err)
    return null
  }
}

export default getAuctionDetails
