import { useEffect, useState } from "react";
import useWallet from "./hooks/useWallet";
import axios from 'axios';
import { ethers } from "ethers"
const pinata_api_key = "84341dedc5714b228c1f";
const pinata_secret_api_key = "3a0293c0918269143c81ab9c4ef791d4f83b0d7f925ddb8aafd43e4c1e3e819d"

function App() {

  const { NFTcontract, Sellcontract, connectWallet, account, provider } = useWallet();
  const [file, setFile] = useState(null);
  const [NFTs, setNFTS] = useState(null);
  const [sellNFT, setSellNFT] = useState(null);
  const [priceValue, setPriceValue] = useState(null);
  const [events, setEvents] = useState(null);

  useEffect(() => {
    connectWallet()
    EventSell()
  }, [])

  const uploadIPFS = async () => {  // (InterPlanetary File System.)
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    // 이미지 파일 올리고
    // 컨텐츠 식별자 주소를 반환하는 메서드
    const { data } = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        pinata_api_key,
        pinata_secret_api_key
      }
    })
    // console.log(`http://gateway.pinata.cloud/ipfs/${data.IpfsHash}`)
    // return (`http://gateway.pinata.cloud/ipfs/${data.IpfsHash}`)
    const ipfsimage = `ipfs://${data.IpfsHash}`;
    const JsonURI = await uploadJsonMetaDataIPFS("bing", "빙빙", ipfsimage);
    const transaction = await NFTcontract.minting(JsonURI);
    await transaction.wait();
    alert("ipfs 업로드 이후 민팅 환료");
  }

  const uploadJsonMetaDataIPFS = async (name, description, image) => {
    const metadata = {
      name,
      description,
      image
    }
    const blob = new Blob([JSON.stringify(metadata)], {
      type: "application/json"
    })
    const formData = new FormData();
    formData.append("file", blob, "metadata.json");
    const { data } = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        pinata_api_key,
        pinata_secret_api_key
      }
    })
    console.log(data.IpfsHash)
    return data.IpfsHash
  }

  const EventSell = async () => {

    const events = await Sellcontract?.queryFilter("addSaleList");
    const eventDTO = events?.map(({ args }) => ({
      owner: args.seller,
      NFTid: args.tokenId,
      price: args.price
    }));
    setEvents(eventDTO);
  }

  useEffect(() => {
    if (account) {
      loadNFT();
      loadSellNFTs();
      EventSell()
    }
  }, [account])

  // nft 조회 조건은 내가 가지고 있는 nft 판매중이지 않은 nft를 보여주는조건
  const loadNFT = async () => {
    // 이벤트 호출했을때 내 계정에서 받은 내용을 가져오기 위한 필터
    // 로그 호출
    const filter = NFTcontract.filters.Transfer(null, account);
    console.log(filter)
    // 이벤트 호출하때 필터 전달해서 로그 호출
    const logs = await provider.getLogs({
      address: NFTcontract.target,
      ...filter,
      fromBlock: 0,
      toBlock: "latest"
    })
    console.log(logs, 'logs')
    // 판매중인 nft 는 내가 안보이게 
    const SellNFTid = await Sellcontract.getSaleList();
    // Set는 중복되는 값이 없도록 배열 생성
    // [1, 1, 1]  = [1]
    const SellNFTs = new Set(SellNFTid.map(id => id.toString()))

    const tokenids = new Set();
    const NFTlist = [];
    for (const log of logs) {
      // 이벤트 파싱
      const parsEvent = NFTcontract.interface.parseLog(log);
      console.log(parsEvent);
      const tokenId = parsEvent.args.tokenId?.toString();
      // minting 이러난 이벤트 로그
      console.log(tokenId);
      if (!tokenids.has(tokenId) && tokenId) {
        tokenids.add(tokenId)
        const owner = await NFTcontract.ownerOf(tokenId);
        console.log(NFTlist, 'NFTlist');

        // account address can be changed DD8093Aa  == dd8093aa
        if ((owner.toLowerCase() === account.toLowerCase()) &&
          !SellNFTs.has(tokenId)) { // 판매중인 nft는 출력에서 제외
          // ipfs 에 저장되어있는 주소
          const tokenUri = await NFTcontract.tokenURI(tokenId);
          // 주소에는 json 의 내용이 반환된다
          const { data: json } = await axios.get(`https://ipfs.io/ipfs/${tokenUri}`);
          json.image = json.image.replace("ipfs://", `https://ipfs.io/ipfs/`)
          NFTlist.push({ tokenId, ...json });
          // https://ipfs.io/ipfs  (InterPlanetary File System.)
        }
      }
    }
    setNFTS(NFTlist);
    console.log(NFTlist, 'NFTlist');
    console.log(NFTs, 'NFTs');
  }

  // 판매 등록
  const SellItem = async (tokenId, price) => {
    if (isNaN(price)) return alert("가격은 숫자를 입력하세요");

    const isApproved = await NFTcontract.isApprovedForAll(account, Sellcontract.target);
    if (!isApproved) {
      // 내 nft를 컨트랙트에게 권한 위임
      const transaction = await NFTcontract.setApprovalForAll(Sellcontract.target, true);
      await transaction.wait();
    }

    const priceWei = ethers.parseEther(price.toString());
    console.log(priceWei, 'wei')
    const transaction = await Sellcontract.addNFTsale(tokenId, priceWei)
    await transaction.wait();
    alert("판매 등록")
    loadNFT(); // 갱신
    loadSellNFTs();
  }

  // 판매 리스트 
  const loadSellNFTs = async () => {
    const tokenids = await Sellcontract.getSaleList()
    const sellItemlist = [];
    for (const tokenid of tokenids) {
      const tokenUri = await NFTcontract.tokenURI(tokenid)
      const { data: json } = await axios(`https://ipfs.io/ipfs/${tokenUri}`)
      json.image = json.image.replace("ipfs://", `https://ipfs.io/ipfs/`)
      const sellInfo = await Sellcontract.sales(tokenid)

      sellItemlist.push({
        tokenId: tokenid.toString(),
        ...json,
        seller: sellInfo.seller,
        price: sellInfo.price
      })
    }
    console.log(sellItemlist, 'sellitemlist')
    setSellNFT(sellItemlist)
  }

  const buyNFT = async (tokenId, price) => {
    const sellInfo = await Sellcontract.sales(tokenId)
    if (sellInfo.seller.toLowerCase() === account.toLowerCase()) return alert("본인의 nft는 구매할수 없다")
    const transaction = await Sellcontract.BuyNFT(tokenId, { value: price })
    transaction.wait();
    alert("구매 완료")
    loadNFT();
    loadSellNFTs();
  }

  const cancelsell = async (tokenId) => {
    const transaction = await Sellcontract.cancelSale(tokenId);
    transaction.wait();
    alert("취소 완료")
    loadNFT();
    loadSellNFTs();
  }


  // `https://ipfs.io/ipfs/${tokenUri}`
  if (!account) return <>...loading</>
  console.log(account.address, 'add')
  return (
    <div className="App">
      계정 주소 : {account} <br />
      <h2>NFT 민팅</h2>
      <div>

        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={uploadIPFS}>파일IPFS 업로드</button>
      </div>
      <label>금액을 입력하세요</label>
      <input type="number" value={priceValue} onChange={({ target: { value } }) => { setPriceValue(value) }} />
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        {NFTs?.map((nft) => <div>
          <img src={nft.image} width="200px" />
          <h4>{nft.name}</h4>
          <p>{nft.description}</p>
          <button onClick={() => SellItem(nft.tokenId, priceValue)}>판매하기</button>
        </div>)}
      </div>
      <h1>판매중 nft</h1>
      <div style={{ display: "flex", gap: "20px", marginTop: "20px", }}>
        {sellNFT?.map((nft) => <div>
          <img src={nft.image} width="200px" />
          <h4>{nft.name}</h4>
          <p>{nft.description}</p>
          <h4>{nft.price}ETH</h4>
          <h4>판매자 : {nft.seller}</h4>
          {(nft.seller !== account) &&
            <button onClick={() => buyNFT(nft.tokenId, nft.price)}>구매하기</button>}
          {(nft.seller === account) &&
            <button onClick={() => cancelsell(nft.tokenId)}>취소하기</button>}
        </div>)}
      </div>
      <div>
        <h2>Event log</h2>
        {events?.map((e) => <div>
          <div>이전 소유자 : {e.owner}</div>
          <div>토큰 아이디 : {e.NFTid}</div>
          <div>거래 가결 : {e.price}</div> <br />
        </div>
        )}
      </div>
    </div>
  );
}

export default App;
