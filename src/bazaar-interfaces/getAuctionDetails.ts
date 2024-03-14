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
  auctionType: 'scheduled' | 'reserve' | 'unknown',
}

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
const RESERVE_AUCTION = '0x434f4c4449455f41554354494f4e000000000000000000000000000000000000'
const SCHEDULED_AUCTION = '0x5343484544554c45445f41554354494f4e000000000000000000000000000000'

function getAuctionType(auctionType: string) {
  if (auctionType === SCHEDULED_AUCTION) {
    return 'scheduled'
  }

  if (auctionType === RESERVE_AUCTION) {
    return 'reserve'
  }

  return 'unknown'
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

    if (auctionCreator === ZERO_ADDRESS) {
      return null
    }

    return {
      contract,
      tokenId: Number(tokenId),
      auctionCreator,
      startingTime: Number(startingTime),
      lengthOfAuction: Number(lengthOfAuction),
      auctionType: getAuctionType(auctionType),
    }
  } catch(err) {
    logger.error(err)
    return null
  }
}

export default getAuctionDetails
