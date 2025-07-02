import { useEffect, useState } from "react";
import useWallet from "./hooks/useWallet";
import styled from "styled-components"

function App() {
  const { contract, account, isNetwork, connectWallet, Mywallet } = useWallet();
  // 상태변수 정리
  // 디지몬 목록 내가 가지고 있는
  // 내가 뽑은 디지몬 보여줄 상태변수
  // 뽑을때 로딩
  // 뽑은 이벤트 이력
  // 이력을 보여줄떄 전체 이력과 내 이력만 보기위한 탭 상태변수
  const [alldigimons, setAlldigimons] = useState([])
  const [digimons, setDigimons] = useState([]);
  const [isloading, setLoading] = useState(false)
  const [latestDigimon, setLatestDigimon] = useState(null)
  const [logs, setLogs] = useState([])
  const [tab, setTab] = useState("ALL");


  const tabs = ["ALL", "MY"];

  const buyDigimon = async () => {
    console.log('sss')
    if (!contract) return;
    setLoading(true);
    const transaction = await contract.buyDigimon();  // 가스비 지불
    await transaction.wait();
    // 구매했을때 뽑힌 디지몬을 내가 가지고 있는 보관함에 넣어줘야한다.
    await loadDigimon();
    setLoading(false);
  }

  // 디지몬 조회 함수
  const loadDigimon = async () => {
    const digimons = await contract.getMyDigimons();
    setDigimons(digimons);
  }

  const eventHandler = (buyer, name, url, event) => {
    const newEvent = {
      buyer, name, url, tsHash: event.transactionHash
    }
    setLogs((prev) => [...prev, newEvent])
    if (buyer.toLowerCase() === account.toLowerCase()) {
      setLatestDigimon({ name, url });
    }
  }
  const availablemons = async () => {
    const digimons = await contract.getDigimons();
    setAlldigimons(digimons)
  }

  const sendDigi = async () => {
    const sendDogimon = await contract.sendDigi(
      account,
    )
  }

  useEffect(() => {
    console.log(contract)
    if (!contract) return;
    contract.on("DigimonEvent", eventHandler)
    // 이벤트 로그 가져오기
    // 비동기 적으로 데이터를 가져와야 하니
    const eventLoad = async () => {
      // queryFilter indexed 지정한 내용을 필터속성을 사용할수도 있고
      const events = await contract.queryFilter("DigimonEvent");
      console.log(events)
      const eventDTO = events.map(({ args, transactionHash }) => ({
        buyer: args.buyer,
        name: args.name,
        url: args.url,
        txHash: transactionHash
      }))  // or {return{}}    returns past values due to update 
      setLogs(eventDTO)
    }
    eventLoad()
  }, [contract])

  // const Send = async () => {
  //   const tx = await sendDigi(receiver, 2)
  //   tx.wait()
  // }

  // (() => {})();

  useEffect(() => {
    if (contract) {
      availablemons()
      loadDigimon()
    }
  }, [contract])

  return (
    <div className="App">
      <h1>디지몬 뽑기</h1>
      <button onClick={connectWallet}>지갑 연결 시도</button>
      <div>계정 : {account}</div>
      <div>sepolia network 검증 : {isNetwork ? "O" : "X"}</div>
      <div></div>

      <h2>구매하기</h2>
      <button onClick={buyDigimon}
        disabled={isloading || !contract} >
        {isloading ? "구매중입니다.." : "구매"}</button>
      <h2>뽑을수 있는 디지몬</h2>
      <ShowDigimon digimons={alldigimons} />

      <h2>내가 방금 뽑은 디지몬</h2>
      {latestDigimon && (
        <div width="50px">

          <DigimonCard {...latestDigimon} sendDigi={contract.sendDigi} />
        </div>
      )}
      <h2>디지몬 목록</h2>
      <div>{digimons.map((digimon, index) => <DigimonCard key={index} url={digimon.url} name={digimon.name} />)}</div>
      <h2>뽑은 이력</h2>
      <div>
        {tabs.map((tab) => <button key={tab} onClick={() => setTab(tab)} >{tab}</button>)}
      </div>
      <ul>
        {logs.map((log, index) => (
          <li>
            <div>{log.buyer}가 디지몬 {log.name}을 뽑았습니다</div>
            <a href={`https://sepolia.etherscan.io/tx/${log.txHash}`}>트랜잭션 보러가기</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

// props
const DigimonCard = ({ url, name }, sendDigi) => {

  const [receiver, setReceiver] = useState("ALL");

  return (
    <div>
      <img src={url} width="200px" />
      <div>{name}</div>
      <input onChange={(e) => setReceiver(e.target.value)} />
      {/* <button onClick={Send()}>send</button> */}
    </div>
  )
}



const ShowDigimon = ({ digimons }) => {
  const Wrap = styled.div`
    display :flex;
    gap : 20px;
  `

  return (

    <Wrap>
      {
        digimons.map((digimon) => (<>
          <div>{digimon.name}</div>
          <img src={digimon.url} width="100px" />
        </>
        ))}
    </Wrap>
  )
}

export default App;
