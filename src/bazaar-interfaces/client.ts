import { Address, createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

export const BAZAAR = '0x6D7c44773C52D396F43c2D511B81aa168E9a7a42' as Address

const client = createPublicClient({
  chain: mainnet,
  transport: http(),
})

export default client
