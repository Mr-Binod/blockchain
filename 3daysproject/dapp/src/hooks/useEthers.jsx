import React, { useEffect, useState } from 'react'
import { ethers } from "ethers"
import BingNFTABI from '../abi/BingNFT.json'
import MetaABI from '../abi/MetaTransaction.json'
import BingTokenABI from '../abi/Bingtoken.json'

export const useEthers = (privatekeys, user) => {
    const [provider, setProvider] = useState(null)
    const [pkprovider, setPkprovider] = useState(null)
    const [paymaster, setPaymaster] = useState(null)
    const [signer, setSigner] = useState(null)
    const [contractNFT, setContractNFT] = useState(null)
    const [contractMeta, setContractMETA] = useState(null)
    const [contractCoin, setContractCOIN] = useState(null)

    const BINGNFT = '0xF50716D1D7F8436ca3c7a9dD8B5Fc29DEe397672'
    const BINGTOKEN = '0x49FEF875c511Fa759fBB6bf6F19fb35691ca918e'
    const METATXN = '0x9B21DE2c924aD6f2C8257a0074bb5bB462e856B2'

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
                    const Paymaster = new ethers.Wallet("fbc1960a886986637345636605e54f7f7e54d1b36f92ee1ec44c77820c444a17", provider)
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
                
                setContractNFT(contractNft)
                setContractMETA(contractmeta)
                setContractCOIN(contractcoin)
            } catch (error) {
                console.log('Error creating contracts:', error)
            }
        } else {
            // Reset contracts when no signer
            setContractNFT(null)
            setContractMETA(null)
        }
    }, [signer])

    return { paymaster, pkprovider, provider, signer, contractNFT, contractMeta, contractCoin }
}
