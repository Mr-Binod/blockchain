import { useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import getWallet from '../../api/Wallet';

const Mainpage = () => {
    const queryClient = useQueryClient();
    const {data, isLoading} = useQuery({
        queryKey : ["data"],
        queryFn : getWallet,
        refetchOnMount : true,
        refetchOnWindowFocus : false,
        enabled : true,
        retry : 10
    })
    useEffect(() => {
        console.log(data,'data')
    },[data])

    if(isLoading) return<>...loading</>
    return (
        <div>
            mainpage
            {data.data}
            <Link to="/mypage">mypage</Link>
        </div>
    )
}

export default Mainpage
