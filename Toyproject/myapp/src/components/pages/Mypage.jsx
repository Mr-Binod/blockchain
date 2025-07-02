import React, { useEffect, useState } from 'react'
import styled from 'styled-components'


const Wrap = styled.div`
  padding : 50px 100px;
`

const Mypage = ({ contract, account, isNetwork, connectWallet }) => {
  const [usertoken, setUsertoken] = useState(null)
      const [usercoins, setUsercoins] = useState([]);

  useEffect(() => {
    const Load = async () => {
      const Usertoken = await contract?.getuserTokens();
      setUsertoken(Usertoken)
     
        const UserCoins = await contract.getuserCoins();
        const CoinsDTO = UserCoins.map((coin, index) => ({
                id: index,
                name: coin.name,
                url: coin.url,
            }));
        setUsercoins(CoinsDTO);
        
      
    }
    Load()
  }, [contract])
  useEffect(() => {
    console.log(usercoins, "usercoins")
  }, [usercoins])

  return (
    <Wrap>
      <div>
        <div>account : {account}</div>
        <div>token : {usertoken}</div>
      </div>
      <div className='items'>
                <h2>나의 구매 상품</h2>
                {usercoins?.map((el, index) => (
                    <div className='item'>
                        <div className='imgsize'>

                            <img src={el.url} alt="" width="200px" />
                        </div>
                        <h3>상품 이름 : {el.name}</h3>
                    </div>
                ))}
            </div>
    </Wrap>
  )
}

export default Mypage
