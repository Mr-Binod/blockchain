import Additem from "./components/pages/Additem";
import Mainpage from "./components/pages/Mainpage";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Mypage from "./components/pages/Mypage";
import Navigation from "./components/Navigation";
import useWallet from "./hooks/useWallet";
import { GlobalStyle } from "./components/styles/GlobalStyles";

function App() {
  const { contract, account, isNetwork, connectWallet } = useWallet();
  
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Navigation account={account} connectWallet={connectWallet} />
        <Routes>
          <Route path="/" element={<Mainpage contract={contract} account={account} isNetwork={isNetwork} connectWallet={connectWallet}/>} />
          <Route path="/upload" element={<Additem contract={contract} account={account} isNetwork={isNetwork} connectWallet={connectWallet} />} />
          <Route path="/mypage" element={<Mypage contract={contract} account={account} isNetwork={isNetwork} connectWallet={connectWallet}/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
