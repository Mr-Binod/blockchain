import React, { useEffect, useState } from 'react'
import { ethers } from "ethers"
import BingNFTABI from '../abi/BingNFT.json'
import MetaABI from '../abi/MetaTransaction.json'
import BingTokenABI from '../abi/Bingtoken.json'
import MetaNftABI from '../abi/MetaBingNFT.json' 

export const useEthers = (privatekeys, user) => {
    const [provider, setProvider] = useState(null)
    const [pkprovider, setPkprovider] = useState(null)
    const [paymaster, setPaymaster] = useState(null)
    const [signer, setSigner] = useState(null)
    const [contractNFT, setContractNFT] = useState(null)
    const [contractMeta, setContractMETA] = useState(null)
    const [contractCoin, setContractCOIN] = useState(null)
    const [contractMetaNft, setContractMetaNft] = useState(null)


 
    const BINGNFT = '0x4788338E5236904150BAb7A9C39843302E220Fd1'
    const BINGTOKEN = '0x650E0043603cD21126051c2102083995A57d4747'
    const METANFT = '0x2225e76dafD379BD91aC505cEc1fbbAe503701b5'
    const METATXN = '0x4FC92402F91001f6Def3EF08B2b3CeD7F4a677B4'

    useEffect(() => {
        // console.log('useEthers: privatekeys length:', privatekeys?.length || 0, 'user:', user);

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
                    const wallets = await Promise.all(promiseWallet)

                    setPaymaster(Paymaster);
                    setPkprovider(wallets);
                    setProvider(provider);

                    // ✅ Use current user's wallet as signer if available
                    if (user && user.data && user.data.privateKey) {
                        try {
                            const userWallet = new ethers.Wallet(user.data.privateKey, provider);
                            setSigner(userWallet);
                            // console.log('User signer set:', userWallet.address);
                        } catch (error) {
                            // console.log('Error creating user wallet:', error);
                            // Fallback to first wallet if user wallet creation fails
                            if (wallets.length > 0) {
                                setSigner(wallets[0].wallet);
                                // console.log('Fallback signer set:', wallets[0].wallet.address);
                            }
                        }
                    } else if (wallets.length > 0) {
                        // Fallback to first wallet if no user data
                        setSigner(wallets[0].wallet);
                        // console.log('Default signer set:', wallets[0].wallet.address);
                    }

                } catch (error) {
                    // console.log("Error in useEthers:", error);
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
                const contractmetanft = new ethers.Contract(METANFT, MetaNftABI.abi, provider)
                
                setContractNFT(contractNft)
                setContractMETA(contractmeta)
                setContractCOIN(contractcoin)
                setContractMetaNft(contractmetanft)
            } catch (error) {
                console.log('Error creating contracts:', error)
            }
        } else {
            // Reset contracts when no signer
            setContractNFT(null)
            setContractMETA(null)
        }
    }, [signer])

    return { paymaster, pkprovider, provider, signer, contractNFT, contractMeta, contractCoin, contractMetaNft }
}
