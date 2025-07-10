import React from 'react'
import axios from 'axios'

const getWallet = async () => {
    const {data} = await axios.get('http://localhost:3001/wallet')
    console.log(data, "api")
    return data
}

export default getWallet
