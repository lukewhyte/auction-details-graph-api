import merge from 'lodash.merge'
import auctionResolver from './auction'

const resolvers = merge(
  auctionResolver,
)

export default resolvers
