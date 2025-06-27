import React, { useEffect, useState } from 'react'
import web3, { Web3 } from "web3"


const SepoliaCId = "0xaa36a7";

const useWeb3 = (abi, CA) => {
    const [user, setUser] = useState({ account: "", balance: 0 });
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);

    const reloadWeb3 = async () => {
        if(!window.ethereum) {
            alert("지갑을 연결해주세요")
            return
        }
        const accounts = await window.ethereum.request({method : "eth_requestAccounts"})
        const chainId = await window.ethereum.request({method : "eth_chainId"})
        if(chainId !== SepoliaCId) {
            alert("세폴리야 네트워크로 전환하세요")
            setUser({ account: "", balance: 0 })
            setWeb3(null)
            return;
        }
        const web3Provider = new Web3(window.ethereum);
        const wei = await web3Provider.eth.getBalance(accounts[0])
        const balance = web3Provider.utils.fromWei(wei, "ether");
        setUser({account : accounts[0], balance})
        setWeb3(web3Provider);
        setContract(new web3Provider.eth.Contract(abi, CA))
    }

    useEffect(() => {
        reloadWeb3();
        const ChainIdhandler = (chainId) => {
            if(chainId !== SepoliaCId) {
                alert("세폴리아 네트워크로 전환해주세요")
                setUser({account : "", balance : 0})
                setWeb3(null)
            }else {
                reloadWeb3();
            }
        }
        if(window.ethereum) {
            window.ethereum.on("chainChanged", ChainIdhandler)
        }
        // 이벤트 구독은 컨포넌트가 사라지면 해제
        return () => {
            // 화면에서 즉 컴포넌트가 사라졌을때 호출
            window.ethereum.removeListener("chainChanged", ChainIdhandler)
        }
    }, [abi, CA])

    return {user, web3, contract}
}

export default useWeb3
