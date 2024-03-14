// const auctionBidAbi = [
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: true,
//         internalType: "address",
//         name: "_contractAddress",
//         type: "address"
//       },
//       {
//         indexed: true,
//         internalType: "address",
//         name: "_bidder",
//         type: "address"
//       },
//       {
//         indexed: true,
//         internalType: "uint256",
//         name: "_tokenId",
//         type: "uint256"
//       },
//       {
//         indexed: false,
//         internalType: "address",
//         name: "_currencyAddress",
//         type: "address"
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "_amount",
//         type: "uint256"
//       },
//       {
//         indexed: false,
//         internalType: "bool",
//         name: "_startedAuction",
//         type: "bool"
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "_newAuctionLength",
//         type: "uint256"
//       },
//       {
//         indexed: false,
//         internalType: "address",
//         name: "_previousBidder",
//         type: "address"
//       }
//     ],
//     name: "AuctionBid",
//     type: "event"
//   }
// ] as const

const auctionBidAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    name: "auctionBids",
    outputs: [
      {
        internalType: "address payable",
        name: "bidder",
        type: "address"
      },
      {
        internalType: "address",
        name: "currencyAddress",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      },
      {
        internalType: "uint8",
        name: "marketplaceFee",
        type: "uint8"
      }
    ],
    stateMutability: "view",
    type: "function"
  }] as const

export default auctionBidAbi
