import { randomBytes } from "crypto";
import { IWallet } from "../interface/wallet.interface";
import elliptic from "elliptic"
import { SHA256 } from "crypto-js";
import { stringify } from "querystring";

// 타원 곡선(curve) 알고리즘 이름
// 타원 곡선의 형태를정의하는 객체를 받고
const ec = new elliptic.ec("secp256k1");

class Wallet implements IWallet {
    account: string; // 공개키를 잘라서 만든 지갑 주소
    balance: number; // 개인키 랜덤한 벙수 엄청 큰수 정수
    privateKey: string;
    publicKey: string; // 지갑에 표현할 잔액 UTXO 에서 가져온다

    // 랜덤 정수
    // 개인키
    // 지감을 생성 했었으면 개인키를 가지고 있다. (노출되면 안된다)
    // 지갑의 개인키를 가지고 있다 라는것 만으로 내가 지갑을 소유하고 있다
    // 이미 지갑을 만든적이 있다 => 개인키 생성한적이 있다 즉 랜덤하데 생성한 값ㅇ르 소유하고 있다.
    constructor(privateKey: string = "") {
        // 개인키가 있으면 사용하고 없으면 새로 생성
        this.privateKey = privateKey || this.setPrivateKey();

        // 개인키로 공개키를 생성
        this.publicKey = this.setPublicKey();

        // 공개키의 문자열의 일부분을 잘라서 사요앟ㄴ 것이 지갑 주소
        this.account = this.setAccount();

        // 잔액
        this.balance = 0;

    }

    setPrivateKey(): string {
        // 랜덤한 32 바이트의 개인키의 값ㅇ르 만들고
        // 해시 문자열로 변환해서 반환 16
        return randomBytes(32).toString("hex");
    }

    // 공개키 생성
    setPublicKey(): string {
        // 반환값이 공개키의 내용
        // keyPair 는 곡개키를 제고하는 메서드가 포함된 객체
        const keyPair = ec.keyFromPrivate(this.privateKey);

        // 개인키로 생성한 공개키를 조회 인코딩해서 반환
        return keyPair.getPublic().encode("hex", true);
    }

    // 지갑의 주소는 앞자리의 문자열을 잘라서 40 자리의 문자열을 만들어서 지갑의 주소로 사용한다
    setAccount(): string {
        // 66 개의 문자열에서 40 앞부분이 26 개를 잘라서 반환
        return this.publicKey.slice(26)
    }

    // 누군가가 한 일이 맞는지 검증 비대칭키 개인키 공개키
    // A -> B 에게 보물상자을 전달했는데 A가 B에게 보물상자의 키를 전달 B는 이 보물상자를 열기위해서 이 키를 사용해서
    // 보물상자 안에 들어있는 내용은 A rk 보물상자르 줬다는 내용이 들어있다 그리고 보물 (message and signature)
    // 트랜잭션의 내용 즉 메시지를 증명할수 있는 키가 공개키 공개키로 검증할수 잇는 값이 서명값
    // 메시지를 하나 만들어서 서명에 사용을 해보자

    static hashMessage(message: string): string {
        return SHA256(message).toString()
    }

    // 서명 생성
    signMessage(message: string): string {
        const hash = Wallet.hashMessage(message);

        // keyPair 객체를 가지고 서명을 생성
        // 타원 곡선의 형태와 기준점과 개인키 공개키
        const keyPair = ec.keyFromPrivate(this.privateKey);

        // 서명 생성
        // RSV 
        // S 값을 짧게 작은 값으로 고정 표준 서명의 값
        // 메시지 문자열 해시값, hex 해시값으로 인코딩, options = {canonical}
        // canonical s 서명의 압축을 
        const signature = keyPair.sign(hash, "hex" ,{canonical : true})
        // 서명 생성
        console.log(signature)

        // r s v (복구 구문)
        // r : 개인키를 통한 연산 => r 개인키의 값 (서명할때 필효한 해시값) 좌표를 구하기 위한 값
        // r : k * G
        // s :  z 서명값가 k 값이랑 개인키 mod n k - 1 * k = 0 mod
        // s = k(^-1) * (z + r * 개인키) mod n
        // k의 값은 k 는 랜덤한 난수 서명을 만들떄 난수가 2 하나는 내가 알고있는 개인키는 이제 변하지 않지만
        // k 서명에 사용되는 난수는 매번 바뀐다. 한번 쓰고 버리는 값 
        // k 는 서명을 만들때마다 바귄다.
        // 개인키가 X 
        // s 가 서명 겁증에 사용되는값 
        // 전달해주는 매개변수의 값 v 비유를 해서 귑게 보조의 값 곡개키로 복워할때 사용되는보조의 정보
        // 실제 서명값은 r s
        // z 메시지 내용 메시지도 서명에 포함되는 이유

        // keyPair 타원곡선의 형태 개인키 곡개키 기준점

        // Signature {
        //     r: BN (bigint) {
        //         negative: 0,
        //             words: [   // 32 바이트로 정 쪼개서 배열의 형태로 나타낸것
        //                 61054683, 32080163,
        //                 12253037, 64375984,
        //                 54546976, 8579972,
        //                 48260402, 37015284,
        //                 59431957, 1547166
        //             ],
        //                 length: 10,
        //                     red: null // module 연산자 내용용
        //     },
        //     s: BN {
        //         negative: 0,
        //             words: [
        //                 586660, 66880340, 36227106, 42475302,
        //                 47669665, 21176364, 61253478, 53841061,
        //                 60130528, 2971352, 0, 0,
        //                 0, 0, 0, 0,
        //                 0, 0, 0, 0,
        //                 0, 0, 0, 0,
        //                 0, 0, 0, 0,
        //                 0, 0
        //             ],
        //                 length: 10,
        //                     red: null
        //     },
        //     recoveryParam: 0
        // }
        // r s v
        // 

        // 서명을 인코딩해서 16 진수 문자열로 변환해서 반환

        return signature.toDER("hex")
    }
    // 서명 검증
    static verifySignature(
        message: string,
        signature: string,
        publicKey: string): boolean {
            const hash = Wallet.hashMessage(message)

            // 공개키를 가지고 있는 객체를 생성
            // 검증 메서드를 호출할수 있다 서명 검증
            const key = ec.keyFromPrivate(publicKey, "hex");

            // verify
            // 해시문자열 => 메시지를 해시와한 문자열
            // hash => 내용이 어떤 일
            // 그 행위가 영수중에 기록되듯이 만든값이 서명값
            return key.verify(hash, signature); 
            // => signature(영수중에 기록된 서명이 올바른지 확인) 
    }
}

const wallet = new Wallet();

const signature = wallet.signMessage("안녕");

console.log(Wallet.verifySignature("안녕", signature, wallet.publicKey));
console.log(Wallet.verifySignature("안녕2", signature, wallet.publicKey));

