import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import useWallet from '../../hooks/useWallet';
import { Link } from 'react-router-dom';

const Wrap = styled.div`
    padding : 50px 70px;
    .item {
        border: 1px solid;
        width: max-content;
        height: max-content;
    }
    .imgsize {
        max-height : 150px;
        overflow : hidden; 
      

    }
    .Additem {
        button {
            width: 200px;
            height: 40px;
            background-color: #14a514;
            border: none;
            border-radius: 10px;
            color: #f3f3f3;
            cursor: pointer;
        }
        button:hover {
            background-color: #24b324;
        }
    }
    .item {
        button {
            width: 100%;
            height: 30px;
            cursor: pointer;
            border: none;
            background-color: #14a514;
            color: #f3f3f3;
            gap: 20px;
        }
           button:hover {
            background-color: #24b324;
        }
    }

    .ConnectBtn {
        width: 200px;
        height: 30px;
        
    }
    .items{
      
    }
`

const Mainpage = () => {

    const { contract, account, isNetwork, connectWallet } = useWallet();
    const [allcoins, setAllcoins] = useState([]);
    const [usercoins, setUsercoins] = useState([]);
    const [tokenamt, setTokenamt] = useState(null);
    const [usertoken, setUsertoken] = useState(null);
    const [events, setEvents] = useState([])

    const BuyToken = async () => {
        if (!contract) {
            alert("connect wallet")
            return;
        }
        if (tokenamt < 100) {
            alert("100토큰 이상 구매 가능합니다")
            return;
        }
        await contract.buyToken(tokenamt);

    }

    useEffect(() => {
        // console.log(contract, account, connectWallet)
        const eventLoad = async () => {
            const events = await contract?.queryFilter("NFTEvents")
            const eventDTO = events.map(({ args }) => ({
                owner: args.owner,
                name: args.name,
                url: args.url,
                price: args.price
            }))
            setEvents(eventDTO)

            const usertoken = await contract?.getuserTokens();
            console.log(usertoken, 'token')
            setUsertoken(usertoken)
        }
        eventLoad()
    }, [contract])
    useEffect(() => {
        console.log(events)
    }, [events])
    return (
        <Wrap>
            <button className='ConnectBtn' onClick={connectWallet}>Connect Wallet</button>
            <div>
                <div>account : {account}</div>
                <div>token : {usertoken}</div>
            </div>
            <div className=''>
                <h2>토큰 구매</h2>
                <label htmlFor="">토큰 구매</label>
                <input type="number" placeholder='최조량 100토큰' onChange={(e) => setTokenamt(e.target.value)} />
                <button onClick={BuyToken}>구매</button>
            </div>
            <div className='Additem'>
                <h2>상품 등록</h2>

                <Link to="/upload"><button >상품 등록</button></Link>
            </div>
            <div className='items'>
                <h2>구매 가능 상품</h2>
                {events?.map((el) => (
                    <div className='item'>
                        <div className='imgsize'>

                            <img src={el.url} alt="" width="200px" />
                        </div>
                        <h3>상품 이름 : {el.name}</h3>
                        <span>가격 : {el.price}</span><br /><br />
                        <button>상품 구매</button>
                    </div>
                ))}
            </div>
        </Wrap>
    )
}

export default Mainpage;