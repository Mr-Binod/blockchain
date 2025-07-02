import Additem from "./components/pages/Additem";
import Mainpage from "./components/pages/Mainpage";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Mypage from "./components/pages/Mypage";
import useWallet from "./hooks/useWallet";

function App() {
  const { contract, account, isNetwork, connectWallet } = useWallet();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Mainpage contract={contract} account={account} isNetwork={isNetwork} connectWallet={connectWallet}/>} />
        <Route path="/upload" element={<Additem contract={contract} account={account} isNetwork={isNetwork} connectWallet={connectWallet} />} />
        <Route path="/mypage" element={<Mypage contract={contract} account={account} isNetwork={isNetwork} connectWallet={connectWallet}/>} />
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;
