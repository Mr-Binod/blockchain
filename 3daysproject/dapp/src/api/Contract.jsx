import axios from "axios"
import { ethers } from "ethers";

const pinata_api_key = "84341dedc5714b228c1f";
const pinata_secret_api_key = "3a0293c0918269143c81ab9c4ef791d4f83b0d7f925ddb8aafd43e4c1e3e819d"



const uploadIPFS = async (formdata, paymaster, contractMetaNft, contractNFT, signer) => {
    const ContractNFT = contractMetaNft.connect(paymaster)
    try {       
        const ipfsImage = `ipfs://${data.IpfsHash}`;
        const JsonURI = await uploadJsonMetadataIPFS("bb", 'ape', ipfsImage)

        const { data } = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formdata, {
            headers: {
                "Content-Type": "multipart/form-data",
                pinata_api_key,
                pinata_secret_api_key
            }
        })

        if (!paymaster) {
            throw new Error('Signer is not available');
        }
            
        const transaction = await ContractNFT.setTokenURI(JsonURI, signer.address);
        await transaction.wait();
        alert("ipfs 업로드 이후 민팅 완료");
        return (`http://gateway.pinata.cloud/ipfs/${data.IpfsHash}`)

    } catch (error) {
        console.log('Error in uploadIPFS:', error);
        alert('Upload failed: ' + error);
    }
    try {
        const ownerTokens = await ContractNFT.ownerToken();
        console.log('Owner tokens:', ownerTokens);
    } catch (error) {
        console.log('Error calling ownerToken:', error.message);
    }
}

const uploadJsonMetadataIPFS = async (name, description, image) => {
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
    console.log(data.IpfsHash, 'hash')
    return data.IpfsHash
}

const GetBTKcoin = async (signer, paymaster, contractMeta, contractCoin) => {
    if (!paymaster) {
        throw new Error('paymaster is not available');
    }
    if (!contractMeta) {
        throw new Error('ContractMeta is not available');
    }
    const paymasterCnt = contractMeta.connect(paymaster)
    // console.log(paymaster, 'paymaster')
    // const balance = await contractMeta.balanceOf(paymaster.address)
    // console.log(contractMeta, ' contractmeta', balance)
    const txmsg = {
        sender: paymaster.address,
        data: 'hello'
    }
    const msgToSign = JSON.stringify(txmsg)
    const signature = await signer.signMessage(msgToSign);
    // console.log(paymaster.getAddress(), 'paymasteraddress', signature, txmsg)
    const Address = signer.getAddress()
    const tx = await paymasterCnt.mint(Address, 120, msgToSign, signature)
    await tx.wait()
    const balance = await contractCoin.balanceOf(signer.address)
    // const token = paymasterCnt.balanceOf(paymaster.address)
    // console.log(token, 'token')
    console.log('hello', tx, balance)
    return balance
}


const getOwnerNft



export { uploadIPFS, GetBTKcoin } 