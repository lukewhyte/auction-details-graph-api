import { logger } from "../winston"

interface ArtworkComponents {
  tokenId: number | null
  contractUrl: string | null
}

export const deconstructArtworkPageUrl = (artworkUrl: string): ArtworkComponents => {
  const SR_URL = 'https://superrare.com/'
  const V2_CONTRACT = '0xb932a70A57673d89f4acfFBE830E8ed7f75Fb9e0'
  const ADDRESS_LENGTH = 42
  const ERR_RESPONSE = {
    tokenId: null,
    contractUrl: null,
  }

  if (!artworkUrl.startsWith(SR_URL)) {
    logger.error(`Artwork url isn't SR url: ${artworkUrl}`)
    return ERR_RESPONSE
  }

  const [contract, token] = artworkUrl.slice(SR_URL.length).split('/')

  if  (!contract) {
    logger.error(`Contract not found with artworkUrl: ${artworkUrl}. Instead got: ${contract}`)
    return ERR_RESPONSE
  }

  if  (!token) {
    logger.error(`Token not found with artworkUrl: ${artworkUrl}. Instead got: ${token}`)
    return ERR_RESPONSE
  }

  const contractUrl = getContractUrl(contract)
  const tokenId = getTokenId(token)

  if  (contractUrl.length !== ADDRESS_LENGTH || !contractUrl.startsWith('0x')) {
    logger.error(`Contract Url is not an address with artworkUrl: ${artworkUrl}. Instead got: ${contractUrl}`)
    return ERR_RESPONSE
  }

  if  (!tokenId) {
    logger.error(`Token is not tokenId with artworkUrl: ${artworkUrl}. Instead got: ${tokenId}`)
    return ERR_RESPONSE
  }

  return {
    tokenId,
    contractUrl,
  }

  function getContractUrl(contract: string) {
    return contract === 'artwork-v2' ? V2_CONTRACT : contract
  }
  
  function getTokenId(token: string) {
    return parseInt(token.split('-').pop(), 10)
  }
}