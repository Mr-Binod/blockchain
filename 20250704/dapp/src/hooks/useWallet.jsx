import React, { useCallback, useEffect, useState } from 'react'
import {BrowserProvider, Contract, ethers, Wallet} from "ethers"
import MyNFT from "../abi/MyNFT.json"
import SellNFT from "../abi/SaleNFT.json"

// 상수 
const NETWORK = {
    chainId: "0xaa36a7",
    name: "sepolia"
}

const useWallet = () => {

    // 이더스 공급자 
    const [provider, setProvider] = useState(null); 
    const [signer, setSigner] = useState(null);
    const [NFTcontract, setNFTContract] = useState(null);
    const [Sellcontract, setSellContract] = useState(null);
    const [account, setAccount] = useState(null);
    const [isNetwork, setIsNetwork] = useState(false)
    // const Mywallet = new Wallet.createRandom();

//     MyNftModule#MyNFT - 0x9399c18Cee0295288bc711a5D2F4DaEf42cA874F
// MyNftModule#SaleNFT - 0xcc06f9aebdF65189f3bD9469b3582c4AB3f72803

    // metamask connection
    const connectWallet = useCallback(async () => {
        if(!window.ethereum) {
            alert("connect metamask wallet")
            return;
        }
        // metamask wallet connection 공급자
        // 확정자 프로그램
        const _provider = new BrowserProvider(window.ethereum);
        const _signer = await _provider.getSigner();
        const _account = await _signer.getAddress();
        const _NFTcontract = new Contract("0x9399c18Cee0295288bc711a5D2F4DaEf42cA874F", MyNFT.abi, _signer)
        const _Sellcontract = new Contract("0xcc06f9aebdF65189f3bD9469b3582c4AB3f72803", SellNFT.abi, _signer)


        const {chainId} = await _provider.getNetwork(); // 현재 연결된 네트워크

        setIsNetwork(`0x${chainId.toString(16)}` === NETWORK.chainId)

        setProvider(_provider);
        // metamask에게 RPC 요청을 보내서 서명자 호출
        setSigner(_signer);
        setAccount(_account);
        setNFTContract(_NFTcontract);
        setSellContract(_Sellcontract);
        console.log(_provider.getSigner, 'sdf',)
    })

    useEffect(() => {
        if(!window.ethereum) return;
        const accChanged = (accounts) => {
            setAccount(accounts[0])}
        // 계정 변겅 이벤트
        const chainChanged = () => {
            window.location.reload()
        }
        window.ethereum.on("accountsChanged", accChanged );
       
        // 체인이 변경되면 
        window.ethereum.on("chainChanged", chainChanged)
        return () => {
            window.ethereum.removeListener("accountsChanged", accChanged)
            window.ethereum.removeListener("chainChanged", chainChanged)
        }
    })
    return { provider, signer, NFTcontract, Sellcontract, account, isNetwork, connectWallet}

}

export default useWallet
