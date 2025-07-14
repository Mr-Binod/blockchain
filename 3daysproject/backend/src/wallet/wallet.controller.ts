import { Body, Controller, Get, Post } from '@nestjs/common';
import { WalletService } from './wallet.service';
import axios from 'axios';

@Controller()
export class WalletController {
    constructor(private walletService : WalletService){}
    @Post("/wallet")
    async createWallet(@Body() data : {user : string}){
        const {user } = data;
        const wallet = new WalletService()
        wallet.init(user);
        await axios.post("http://localhost:3001/model", {wallet})
        // console.log(data, wallet, "post")
        return wallet
    }
    @Get("/wallet")
    getWallet() {
        console.log('zz')
        // return this.walletService.getWallet();
        return ({data : 'hello'})
    }
    @Get("/wallets")
    getWallets() {
        const wallets = this.walletService.getWallets()
        // console.log(wallets, "wallets")
        return {data : wallets}
    }
}
