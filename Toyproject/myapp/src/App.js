import Additem from "./components/pages/Additem";
import Mainpage from "./components/pages/Mainpage";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Mypage from "./components/pages/Mypage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Mainpage/>} />
        <Route path="/upload" element={<Additem/>} />
        <Route path="/mypage" element={<Mypage/>} />
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;
