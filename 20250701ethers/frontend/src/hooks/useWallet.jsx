import React, { useCallback, useEffect, useState } from 'react'
import {BrowserProvider, Contract, ethers, Wallet} from "ethers"
import DigimonJson from "../abi/DigimonModule#Digimon.json"

// 상수 
const NETWORK = {
    chainId: "0xaa36a7",
    name: "sepolia"
}

const useWallet = () => {

    // 이더스 공급자 
    const [provider, setProvider] = useState(null); 
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState(null);
    const [isNetwork, setIsNetwork] = useState(false)
    // const Mywallet = new Wallet.createRandom();

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
        const _contract = new Contract("0xAea06203e4ECa9E90Eb6385E57026dA22d3Fe9f4", DigimonJson.abi, _signer)


        const {chainId} = await _provider.getNetwork(); // 현재 연결된 네트워크

        setIsNetwork(`0x${chainId.toString(16)}` === NETWORK.chainId)

        setProvider(_provider);
        // metamask에게 RPC 요청을 보내서 서명자 호출
        setSigner(_signer);
        setAccount(_account);
        setContract(_contract);
        console.log(_provider.getSigner, 'sdf')
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
    return { provider, signer, contract, account, isNetwork, connectWallet}

}

export default useWallet
