import { useState } from 'react'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { Route } from 'react-router-dom'
import Web3Modal from 'web3modal'
import web3 from 'web3'

import { nftaddress, nftmarketaddress } from '../config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'

const client = ipfsHttpClient('https://gateway.pinata.cloud/ipfs/')

export const CreateItem = () => {
  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({ tokenUri: '', price: '' })
//   const router = useRouter()

  async function createSale(url) {
    // write code to create sale here
    const listingPrice = web3.utils.toWei('0.01', 'ether')

    const web3Modal = new Web3Modal({
        network: "ropsten",
        cacheProvider: true,
      });
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)    
    const signer = provider.getSigner()

    let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
    let transaction = await contract.createToken(url)
    let tx = await transaction.wait()
    let event = tx.events[0]
    let value = event.args[2]
    let tokenId = value.toNumber()
    const price = web3.utils.toWei(formInput.price, 'ether')
  
    contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    transaction = await contract.createMarketItem(nftaddress, tokenId, price, { value: listingPrice })
    await transaction.wait()
    // Route.push('/')
  }

  async function createMarket() {
    const { tokenUri, price } = formInput
    if (!tokenUri || !price ) return
      const url = `https://gateway.pinata.cloud/ipfs/${tokenUri}`
      createSale(url)
  }

  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        <input 
          placeholder="Token URI"
          className="mt-8 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, tokenUri: e.target.value })}
        />
        <input
          placeholder="NFT Price in Eth"
          className="mt-2 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
        />
        <button onClick={createMarket} className="mt-4 bg-blue-500 text-white rounded p-4 shadow-lg">
          Create NFT
        </button>
      </div>
    </div>
  )
}
