const getAuctionDetailsAbi = [
  {
    type: 'function',
    name: 'getAuctionDetails',
    inputs: [
      {
        internalType: 'address',
        name: '_originContract',
        type: 'address'
      },{
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256'
      }
    ],
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: '',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      },
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      },
      {
        internalType: 'address payable[]',
        name: '',
        type: 'address[]'
      },
      {
        internalType: 'uint8[]',
        name: '',
        type: 'uint8[]'
      }
    ],
    stateMutability: 'view',
  }
] as const

export default getAuctionDetailsAbi
