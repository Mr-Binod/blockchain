import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ModelService } from './model.service';
import { IWallet } from 'src/wallet/wallet.interface';


@Controller()
export class ModelController {
    constructor(private readonly modelService: ModelService) { }

    @Post('model')
    async createUser(@Body() body: { wallet: IWallet }) {
        const { wallet } = body;
        const { user, account, balance, privateKey, publicKey } = wallet;
        console.log(wallet, 'model', user, account, balance, privateKey, publicKey)
        return await this.modelService.createUser(user, account, balance, privateKey, publicKey)
    }

    @Get("model/:id")
    async getUser(@Param('id') id:string ){
        console.log(id, 'id11')
        return await this.modelService.getUser(id);
    }
    @Get("models")
    async getAllusers(){
        return await this.modelService.getAllusers();
    }
    
}
