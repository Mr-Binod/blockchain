import React, { useEffect, useState } from 'react'
import { ethers } from "ethers"
import BingNFTABI from '../abi/BingNFT.json'
import MetaABI from '../abi/MetaTransaction.json'
import BingTokenABI from '../abi/Bingtoken.json'
import MetaBingNFTABI from '../abi/MetaBingNFT.json'

export const useEthers = (privatekeys, user) => {
    const [provider, setProvider] = useState(null)
    const [pkprovider, setPkprovider] = useState(null)
    const [paymaster, setPaymaster] = useState(null)
    const [signer, setSigner] = useState(null)
    const [contractNFT, setContractNFT] = useState(null)
    const [contractMeta, setContractMETA] = useState(null)
    const [contractCoin, setContractCOIN] = useState(null)
    const [contractMetaNft, setContractMetaNft] = useState(null)

    // DeployAllModule#BingNFT - 0x05AF089171046b10654Cd34BB17cc2A5218fF35b
    // DeployAllModule#Bingtoken - 0xfd73ada76B2cf70E9f34bE058059C472F2BE76eD
    // DeployAllModule#MetaBingNFT - 0xa26F06a45A3b629eeCA1f52Ce8d0B01A70B2A583
    // DeployAllModule#MetaTransaction - 0x34C5B5592B140336CFE4B42eaa9172427B321261

    const BINGNFT = '0x05AF089171046b10654Cd34BB17cc2A5218fF35b'
    const BINGTOKEN = '0xfd73ada76B2cf70E9f34bE058059C472F2BE76eD'
    const METATXN = '0x34C5B5592B140336CFE4B42eaa9172427B321261'
    const METANFT = '0xa26F06a45A3b629eeCA1f52Ce8d0B01A70B2A583' // Deployed MetaBingNFT address

    useEffect(() => {
        console.log('useEthers: privatekeys length:', privatekeys?.length || 0, 'user:', user);

        (async () => {
            if (privatekeys && privatekeys.length > 0) {
                try {
                    const provider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/e7468d2d517b4aa28ba51a6e589558e2")
                    const promiseWallet = privatekeys.map(async (pk) => {
                        const wallet = new ethers.Wallet(pk, provider);
                        const balance = await provider.getBalance(wallet.address)
                        const balanceEth = ethers.formatEther(balance)
                        return {
                            wallet,
                            balance: balanceEth,
                            address: wallet.address
                        }
                    })
                    const Paymaster = new ethers.Wallet("1bb48ef643ede40a87a2b32be5d9c11a0192490d94105dc6f81c0ae102dda212", provider)
                    console.log(promiseWallet, 'promise')
                    const wallets = await Promise.all(promiseWallet)

                    setPaymaster(Paymaster);
                    setPkprovider(wallets);
                    setProvider(provider);

                    // ✅ Use current user's wallet as signer if available
                    if (user && user.data && user.data.privateKey) {
                        try {
                            const userWallet = new ethers.Wallet(user.data.privateKey, provider);
                            setSigner(userWallet);
                            console.log('User signer set:', userWallet.address);
                        } catch (error) {
                            console.log('Error creating user wallet:', error);
                            // Fallback to first wallet if user wallet creation fails
                            if (wallets.length > 0) {
                                setSigner(wallets[0].wallet);
                                console.log('Fallback signer set:', wallets[0].wallet.address);
                            }
                        }
                    } else if (wallets.length > 0) {
                        // Fallback to first wallet if no user data
                        setSigner(wallets[0].wallet);
                        console.log('Default signer set:', wallets[0].wallet.address);
                    }

                } catch (error) {
                    console.log("Error in useEthers:", error);
                }
            } else {
                // Reset signer when no private keys
                setSigner(null);
                setProvider(null);
                setPkprovider(null);
                setPaymaster(null);
            }
        })()
    }, [privatekeys, user])

    // ✅ Create contracts after signer is available
    useEffect(() => {
        if (signer && provider) {
            try {
                const contractNft = new ethers.Contract(BINGNFT, BingNFTABI.abi, provider)
                const contractcoin = new ethers.Contract(BINGTOKEN, BingTokenABI.abi, provider)
                const contractmeta = new ethers.Contract(METATXN, MetaABI.abi, provider)
                const contractmetaNft = new ethers.Contract(METANFT, MetaBingNFTABI.abi, provider)
                setContractNFT(contractNft)
                setContractMETA(contractmeta)
                setContractCOIN(contractcoin)
                setContractMetaNft(contractmetaNft)
            } catch (error) {
                console.log('Error creating contracts:', error)
            }
        } else {
            // Reset contracts when no signer
            setContractNFT(null)
            setContractMETA(null)
            setContractCOIN(null)
            setContractMetaNft(null)
        }
    }, [signer])

    return { paymaster, pkprovider, provider, signer, contractNFT, contractMeta, contractCoin, contractMetaNft }
}
