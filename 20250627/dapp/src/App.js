import useWeb3 from "./hooks/useWeb3";
import contractABI from "./abi/src_contracts_BTK_sol_BingToken.json"
import { useEffect, useState } from "react";

function App() {
  const {user, contract, web3} = useWeb3(contractABI, "0x11b5861e5e1e665cd3e09fc8a5856897272ec495")
  const [token, setToken] = useState(0)
  useEffect(() => {
    console.log({user,contract, web3})
    balanceOf()
  }, [user])
  const balanceOf = async () => {
    if(!contract) return;
    const wei = await contract.methods.balanceOf(user.account).call();
    const token = web3.utils.fromWei(wei, "ether");
    setToken(token)
  }
  if(!user) return <>...로딩중</>
  return (
    <div className="App">
      <div>지갑 : {user.account}</div>
      <div>ETH : {user.balance}</div>
      <div>TKN : {token} BTK</div>
    </div>
  );
}

export default App;
