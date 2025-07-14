import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { createWallet, getWallet, getWallets } from '../../api/Wallet';
import { getUser, getUsers } from '../../api/Model';
import { useEthers } from '../../hooks/useEthers';
import {useDispatch, useSelector} from "react-redux"
import  {uploadIPFS, GetBTKcoin } from '../../api/Contract';

const Mainpage = () => {
    const [userkeys, setUserkeys] = useState([])
    const [users, setUsers] = useState(null);
    const [nfts, setNfts] = useState(["http://gateway.pinata.cloud/ipfs/QmeuPaDUPkWsYfSMb2yUztWNhFUTTvPaqns3H9UW4fcGGY"])
    const islogin = useSelector((state) => state.State)
    const userId = useSelector((state) => state.userId)  // ✅ Get from Redux
    const user = useSelector((state) => state.user)      // ✅ Get from Redux
    const { pkprovider, provider, paymaster, signer, contractMeta, contractNFT, contractCoin } = useEthers(userkeys, user)
    
    const dispatch = useDispatch()

    const queryClient = useQueryClient();
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["data"],
        queryFn: async () => {
            const wallets = await getUsers();

            setUsers(wallets)
            const privateKeys = wallets.map((el) => el.privateKey);
            setUserkeys(privateKeys);

            return ({ wallets })
        },
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        enabled: true,
        retry: 10
    })

    // ✅ Separate query for user data
    const { data: userData, isLoading: userLoading } = useQuery({
        queryKey: ["user", userId],
        queryFn: async () => {
            if (userId) {
                const Userinfo = await getUser(userId)
                dispatch({type: 'setUser', payload: Userinfo})
                return Userinfo
            }
            return null
        },
        enabled: !!userId, // Only run when userId exists
        retry: 3
    })
    const createwalletMutn = useMutation({
        mutationFn: createWallet,
        onSuccess: () => {
            // refetch()
            queryClient.invalidateQueries(['users'])
        }
    })
    const createNftMutn = useMutation({
        mutationFn: async (e) => {
            e.preventDefault();
            if(!signer) return alert('signer not available');
            const formdata = new FormData();
            console.log('test uploadipfs data', e.target.file.files[0])
            const File = e.target.file.files[0];
            formdata.append("file", File)
            console.log('test uploadipfs data', formdata, signer)
            const data = await uploadIPFS(formdata, paymaster, contractMeta, contractNFT)
            console.log(data, 'uploadipfs data')
            setNfts([...nfts, data])

        },
        onSuccess: () => {
            // refetch()
            queryClient.invalidateQueries(['users'])
        }
    })


    const loginHandler = (e) => {
        e.preventDefault();
        const { userid } = e.target;
        const isUser = users && users.find((el) => el.user === userid.value);
        if (!userid.value || !isUser || userid.value.trim() === "") return alert('아이디를 입력해주세요');
        dispatch({type: 'setUserId', payload: userid.value})  // ✅ Set in Redux
        dispatch({type : 'login'})
        userid.value = "";
    }
    const signUp = (e) => {
        e.preventDefault();
        const { signupid } = e.target;
        const isUser = users && users.find((el) => el.user === signupid.value);
        if (isUser) return alert('이미 사용된 아이디입니다');
        dispatch({type: 'setUserId', payload: signupid.value})  // ✅ Set in Redux
        createwalletMutn.mutate(signupid.value)
        signupid.value = "";
    }
    const LogoutHandler = () => {
        dispatch({type : 'logout'})  // This will clear userId and user too
        console.log('zz')
    }

    const getBTKcoin = async () => {
        const  txMessage = {
            sender : user.account,
            data : 150
        }
        const sign = await signer.signMessage(JSON.stringify(txMessage));
        const data = GetBTKcoin(signer, paymaster , contractMeta, contractCoin );
    }

    useEffect(() => {
        // ✅ Fetch user data when userId changes
        if (userId && !user) {
            const fetchUserData = async () => {
                try {
                    const Userinfo = await getUser(userId)
                    dispatch({type: 'setUser', payload: Userinfo})
                } catch (error) {
                    console.error('Error fetching user data:', error)
                }
            }
            fetchUserData()
        }
    }, [userId, user, dispatch])

    useEffect(() => {
        // console.log(users, 'users data')
        // console.log(userId, 'userId data')
        console.log(user, 'user data')
        // console.log(data, 'query data')
        // console.log(userkeys, 'userkeys data')
        // console.log(islogin, 'islogin data')
        console.log(signer, 'signer data')
        console.log(nfts, 'nfts data')
        // console.log(pkprovider, provider, paymaster, 'providers data')
        if(!contractNFT) return;
        (async () => {

            //  console.log(await contractNFT.ownerToken(), 'ownertoken')
        })()

    }, [users, data, userkeys, islogin, signer, pkprovider, provider, paymaster, user])

    
    
     

    if (isLoading) return <>...loading</>
    return (
        <div>
            mainpage
            <Link to="/mypage">mypage</Link> <br />

            {!islogin ? <div> <form onSubmit={(e) => loginHandler(e)}>
                <input type="text" name='userid' />
                <button>Login</button>
            </form> <br />
                <form onSubmit={(e) => signUp(e)}>
                    <input type="text" name='signupid' />
                    <button>signup</button>
                </form></div>
                : <button onClick={LogoutHandler}>Logout</button>}
            {/* Display Users */}
            {islogin && <div>

                <h3>Get Bing Token</h3>
                <button onClick={getBTKcoin} >Getcoin</button>
                <h3>uploadNFT</h3>
                <form onSubmit={(e) => createNftMutn.mutate(e)}>
                    <input type="file" name='file' />
                    <button>submit</button>
                </form>
                <h3>NFTs:</h3>
                <img src="http://gateway.pinata.cloud/ipfs/QmeuPaDUPkWsYfSMb2yUztWNhFUTTvPaqns3H9UW4fcGGY"/>
                {nfts?.map((el, i) => <img key={i} src={el}/>)}
                <h3>Users:</h3>
                {users && users.length > 0 ? (
                    <ul>
                        {users.map((user, index) => (
                            <li key={index}>
                                User: {user.user} | Account: {user.account} | Balance: {user.balance}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No users found</p>
                )}
            </div>}
        </div>
    )
}

export default Mainpage
