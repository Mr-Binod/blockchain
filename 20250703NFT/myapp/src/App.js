


// https://docs.pinata.cloud/api-reference/endpoint/ipfs/pin-file-to-ipfs#blobs
// https://api.pinata.cloud/pinning/pinFileToIPFS

import { useEffect, useState } from "react";
import axios from 'axios';
import useWallet from "./hooks/useWallet";
const pinata_api_key = "84341dedc5714b228c1f";
const pinata_secret_api_key = "3a0293c0918269143c81ab9c4ef791d4f83b0d7f925ddb8aafd43e4c1e3e819d"


function App() {

  const { account, contract, connectWallet } = useWallet();
  const [file, setFile] = useState();

  useEffect(() => {
    connectWallet()
  }, [])

  const uploadIPFS = async () => {
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
    const transaction = await contract.minting(JsonURI);
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

  return (
    <div className="App">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={uploadIPFS}>파일IPFS 업로드</button>
    </div>
  );
}

export default App;
