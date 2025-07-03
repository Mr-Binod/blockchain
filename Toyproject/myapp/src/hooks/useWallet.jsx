import React, { useCallback, useEffect, useState } from 'react'
import { BrowserProvider, Contract, ethers, Wallet } from "ethers"
import Coinjson from "../ABI/CoinNFT.json"

const NETWORK = {
    chainId: "0xaa36a7",
    name: "sepolia"
}


const useWallet = () => {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState(null);
    const [isNetwork, setIsNetwork] = useState(false)
    const connectWallet = useCallback(async () => {
        if (!window.ethereum) {
            alert("connect metamask wallet")
            return;
        }
        
        const _provider = new BrowserProvider(window.ethereum);
        console.log(_provider)
        const _signer = await _provider.getSigner()
        const _account = await _signer.getAddress();
        const _contract = new Contract("0x2D7BA8617e135eDd95FAb591963Ad85cbC9ee3B4", Coinjson.abi, _signer)
        const { chainId } = await _provider.getNetwork();

        setIsNetwork(`0x${chainId.toString(16)}` === NETWORK.chainId)
        setProvider(_provider);
        // metamask에게 RPC 요청을 보내서 서명자 호출
        setSigner(_signer);
        setAccount(_account);
        setContract(_contract);
        console.log(_provider.getSigner, 'sdf')
    })
    return { contract, account, isNetwork, connectWallet }
}

export default useWallet;