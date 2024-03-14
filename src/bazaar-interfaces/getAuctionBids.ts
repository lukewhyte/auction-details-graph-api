import client, { BAZAAR } from './client'
import { Address, formatEther, parseEther } from 'viem'
import auctionBidAbi from './abis/auctionBids'
import { logger } from '../winston'

export interface AuctionBids {
  bidder: string | null
  currencyAddress: string | null
  amount: string | null
  marketplaceFee: number | null
}

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
 
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

    if (bidder === ZERO_ADDRESS || formatEther(amount) === '0') {
      return null
    }

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
