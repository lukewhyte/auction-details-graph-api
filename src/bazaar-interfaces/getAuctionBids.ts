import client, { BAZAAR } from './client'
import { Address, formatEther, parseEther } from 'viem'
import auctionBidAbi from './abis/auctionBids'
import { logger } from '../winston'

export interface AuctionBids {
  bidder: string
  currencyAddress: string
  amount: string
  marketplaceFee: number
}
 
const getAuctionBids = async (contract: Address, tokenId: bigint): Promise<AuctionBids | null> => {
  try {
    const data = await client.readContract({
      address: BAZAAR,
      abi: auctionBidAbi,
      functionName: 'auctionBids',
      args: [contract, tokenId]
    })

    if (!data.length) {
      return null
    }

    const [
      bidder,
      currencyAddress,
      amount,
      marketplaceFee
    ] = data

    return {
        bidder,
        currencyAddress,
        amount: formatEther(amount),
        marketplaceFee,
    }
  } catch(err) {
    logger.error(err)
    return null
  }
}

export default getAuctionBids
