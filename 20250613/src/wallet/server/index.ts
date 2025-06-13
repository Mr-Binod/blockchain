import express from "express"
import path from "path"
import fs, { access } from "fs"
import {Wallet} from "../index"

const app = express();

app.use(express.urlencoded({extended : false}))
app.use(express.json())

app.get("/", (req, res) => {
    const page = fs.readFileSync(path.join(__dirname, "..", "/view/index.html"), "utf-8");
    res.send(page);
})

// 지갑 목록 조회
app.get("/wallets", (req, res) => {
    const list = Wallet.getWalletList();
    res.json(list);
})
// 지금 내용 잘 공부해놔야 한다
app.post("/wallet", (req, res) => {
    
    res.json(new Wallet());
})

// 이미 있는 지갑 조회
app.get("/wallet/:id", (req, res) => {
    const {id} = req.params;
    const privateKey = Wallet.getWalletPrivateKey(id);
    res.json(new Wallet(privateKey))
})

app.listen(3000, () => {
    console.log("server.on")
})