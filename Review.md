
배열 튜플 : 배열의 사이즈하고 배열의 있는 인덱스의 타입까지 정하다
```js
let list : [string, number] = ['name', 7]

```

객체의 키 타입, 배열의 타입, 배열의 튜플, 함수의 매개변수 타입, 함수의 반환 타입 천제를 정해야한다

// 설계 생각을 해보는것 

```js
const add = (a : number, b : number) : number => {
    return a + b
}

interface Count {
    num : number;
    num2 : number;
    message : string;

}
interface Count2 {
    num3 : number;
}

// vo dto dao => ioc container

const count : Count & Count2 = {
    num : 1,
    num2 : 2,
    message : '안녕',
    num3 : 3
}

// class
class Count3 implements Count {
    num : number 
    num2 : number
    message : string
    constructor () {
        this.num = 1;
        this.num2 = 2;
        this.message = '123'
    }
}


//
 
interface  I should be attached before variable name like `ICount`
implements 
new
this
bind, call, apply 


- 기업 맞춤형 -> 기업의 시장조사 -> 이 기업의 맞춤형 이력서 저소서
