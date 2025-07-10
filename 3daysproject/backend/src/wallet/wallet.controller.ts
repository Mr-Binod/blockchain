import { Body, Controller, Get, Post } from '@nestjs/common';
import { WalletService } from './wallet.service';

@Controller()
export class WalletController {
    constructor(private readonly walletService : WalletService){}
    @Post("/wallet")
    createWallet(@Body() data : string){
        console.log(data)
        return (new WalletService())
    }
    @Get("/wallet")
    getWallet() {
        // return this.walletService.getWallet();
        return ({data : 'hello'})
    }
    @Get("/wallets")
    getWallets() {
        return this.walletService.getWallets()
    }
}
