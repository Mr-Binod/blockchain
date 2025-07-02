import React, { useState } from 'react'
import styled from 'styled-components'
import useWallet from '../../hooks/useWallet';
import { useNavigate } from 'react-router-dom';


const Wrap = styled.div`
    padding: 50px 100px;

`

const Additem = ({ contract, account, isNetwork, connectWallet }) => {
    // const { contract, account, isNetwork, connectWallet } = useWallet();
    const [items, setItems] = useState([])

    const navigate = useNavigate();
    const Sell = async(e) => {
        e.preventDefault();
        connectWallet();
        const name = e.target.elements.name.value;
        const url = e.target.elements.url.value;
        const price = e.target.elements.price.value;

        await contract.sellNFT(name, url, price)
        const getNFT = await contract.getCoins();
        console.log(getNFT,"getnft")
        setItems(...getNFT)
        navigate("/");
    }

    return (
        <Wrap>
            <form onSubmit={(e) => Sell(e)}>
                <label>상품 이름</label><br />
                <input type="text" name="name" required/><br />
                <label>상품 이미지 경로</label><br />
                <input type="text" name="url" required/><br />
                <label>가격</label><br />
                <input type="text" name="price" required/><br /><br />
                <button >판매하기</button>
            </form>
        </Wrap>
    )
}

export default Additem
