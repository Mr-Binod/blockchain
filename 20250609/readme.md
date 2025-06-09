
# 타입스크립트
> 자비스크립트의는 동적인 언어 타입을 가지고 있는데 객채지향에 반하는 형태로 설계되었다. (프로토타입)
> 변수의 타입은 자바스크립트에서는 실행 시키는 후에 런타임 환경에서 예츨하지못한 타입에러가 발생할수 있다.
> 타입스크립트는 마이크로소프트에서 만드는 트랜스파일러 
> 타입스크립트는 browser 에서 런타임 환경을 제공하지 않습니다.
> 컴파일을 통해 자바스크립트로 변환한후 런타임 환경에서 동작된다.

> 프로젝트의 규모가 커지다보면 벼그나 유지보수에 어렵다 사람이 많은 프로젝트가 진행되기 때문에 타입의 조건 검증 코드가 늘어나고 가족성ㅇ이 떨어지고 실행 전까지 에러를 파악할수 없다.

> 상위 집합 즉 슈퍼셋 언어로 타입스크립트를 마이크로소프트에서 발표 했다.

> 타입스크립트의 목표는 타입을 사용하게된 이유 목적만이 아니라 객체 지향 프로그래밍을 하기 위한 목적을 가지고 있다. 푸상화 -> 이력서 우대사항 타입스크립트가 우대조건으로 있고 (객체지향 언어를 경험하신분)

### 원시 타입
```ts
// 자바스크립트에서는 
// 원시 타입 7 (number, string, boolean, undefined, null, bigint, symbol)
// 참조 타입 3 (array, function, object)
let count = 1;  // boxing unboxing proto type
// 숫자 타입이 동적으로 할당

count = '1'; // 자바스크립트

// 타입지정 타입스크립트
let count : number = 1;
let isActive : string = 'hello'
let count1 : undefined = undefined
let null : null = null
let any : any = '123'
let any : any = null


// 배열 튜플 (고정된 배열의 사이즈)
// 배열 튜플
// 타입스크립트

let list = [] // 자비스크립트에서 배열 요소들이 동적인 타입을 가진다
let list : number[] = [];


// 객체의 타입 지정 
// 추상화 

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



// 타입스크립트의 고급 타입 (유니언 타입)(multi type)
// 유니언 타입은 둘이상의 타입중에 하나에 속할수 있다.

const add5 = (a : number | string, b : string) : string | number => {
    return a + b
}

// 제네릭
// 제네릭 함수 혹은 생성자 클래스에 타입을 매개변수처럼 전달해서 사용할수 있는 방식
// 타입을 인자로 전달할수 있다
// 타입을 두가지 혹은 여러가징를 사용하는데 확장성을 고래서 작성할수 있다

// 두값을 더하는 함수인데 문자열을 더할수도 있고 숫자를 더할수도 있는데 매개변수의 값의 타입이 잘전달이 될지 추론을 하고싶다

function add<T, A, B> (a : T, b : A) : B {
    return a + b
}

add<number>(1,2)
// 제네릭 문법을 사용하는 구문은 실행단계에서 타입이 정의된다.

interface IResult {
    message : string,
    result : number
}
interface IError {
    message : string
}

class Count<R, E> {
    constructor () {
    }
    add = (bool : boolean) : R | E => {
        // 로직에 따라서 결과 객체의 형태를 반환하거나 에러객체의 형태를 반환하거나
        if(bool) {
            let result : R = {

            }
            return {message : '성공', result : 200}
        }else {
            let error : E = {

            }
            return {message : '실패'}
        }
    }
}
// 설계 생각을 해보는것

const add = () => {

}

```

```ts
// 추상 클래스로 상품을 정의할때 필요한 형태를 정의

interface IProduct {
    name : string, 
    price : number,
    discountAmount : number
}

class Product implements IProduct {
    name : string,
    price : number,
    discountAmount : number;
    constructor (name : string, price : number) {
        this.name = name;
        this.price = price;
        this.discountAmount = 0;
    }
    getName() : string {
        return this.name
    }
    getPrice() : number {
        return this.price
    }
    getPricediscount() : number {
        return this.price - this.discountAmount;
    }
    setDiscountamount(amount : number) : void {
        this.discountAmount = amount;
    }
}

// new 는 object 생성해준다 {} 객체 
const product = new Product('shirt', 3000)
product.getname(); // OOP 캡슐화
product.getprice();
product.getPricediscount() // 3000
product.setDiscountamount(2000)
product.getPricediscount() // 1000

```

## this 가 어려운 이유 상위 객체를 참조한다.
```js
function Foo (a, b) {
    this = {} // 함수 스코프에서 this를 사용하면 객체가 할당이 된다. this 는 객체를 참조 즉 할당
    // 함수가 실행되는 영역의 상위 객체를 할당한다
}

Foo() // 전역 스코프 {} 전역도 객체도 windows 객체 this 의 위치가 어디있느냐에 바인드가 되어서 상위 객체를 참조하는것
// new 키워드는 객체의 생성을 한뒤 {} new 키워드 뒤에 있는 생성자 함수를 객체의 스코프에서 실행한다
// new 키워드로 

```

## 일반 함수로 사용

```js

function Foo (a, b) {
    console.log(this)
    return [a, b]
}
Foo(1,2)

// function 프로토타입 속성중에 이터러블 메타데이터 다음 속성을 표현하는 설명하는 속성을 표현하는 설명하는 속성이 for in for of
// function enumerable 속성이 들어있는데 생성자 함수는 'true' 클래스는 false 클래스에서 객체를 생성할때 불필효한 값이 선언되지 않도록

function Foo2 (a, b) {
    this.a = a;
    this.b = b;
}
const obj = new Foo2(1, 2)

// Rxjs  // iteration 대해 극한으로 다뤄보고 싶다

// 생성자 함수로 만든 객체와 클래스로 만든 객체를
// for in 문을 사용해서 동작시켜보면 class 객체는 순회가 되지 않는다
// function 생성자 함수로 생성한 ㄱ4ㅐㄱ체는 순회가 된다. // 생성된 객체의 불필효한 내용을 빼고 객체를 생성한다

// 일반 함수는 화살표 함수를 사용하고 객체 생성은 클래스를 사용해라

```

### this binding

#### 일반 함수
```js

function a() {
    console.dir(a);
}


function Foo(a, b) {
    console.log(this)
    return [a, b]

}

const a = Foo(1, 2)
console.log(a) // [1, 2]

const bar = {
    method : Foo
}
// scope is bar 상위 객체 bar
const b = bar.method(2, 3)
console.log(b) // 

const bar2 = {
    method : function () {
        console.log(this)
    }
}

bar2.method();

```

### 바인드 this 
> foo는 같은 함수인데도 this 의 결과물이 다르다
> this 가 객체를 할당받는 즉 참조하는 예약어 상위객체의 주소를 할당시켜준다
> 용어로 표현했을때 this binding 이라고 한다.

- bind
- call
- apply

### 바인드 메서드를 사용

```js

function Foo (a, b) {
    console.log(this)
    return [a, b];
}

// 연산자 등 함수 모든 자바스크립트를 사용하면서 공부하면서 가장 중요하게 보고 설계하는 부분은 매개변수 반홤값 그리고 타입

// function 에서 바인딩을 제어하는 메서드를 제공한다

const foo = Foo.bind({name : 'soon'})

console.log(foo(1,2))

const bar = {method : foo}

bar.method(1, 2)

```

### call, apply

```js

function Foo (a, b) {
    console.log(this)
    return [a, b];
}

// call

// 바인드 하고 함수 실행 첫번째 인자로 전달한 객체를 바인드 한다 
// 두번째 이후부터 매개변수로 전달 순서대로
const foo = Foo.call({name : 'soon'}, 1, 2);

call(obj, a, b) {
    this = obj
    return this.method(a, b)
}

console.log(foo)

// apply

// 매개변수는 배열형태로 값을 전달
const foo = Foo.apply({name : 'soon'}, [1, 2])

```


### 함수의 다향한 this 

- 일반 함수
- 생성자 함수
- 객체 메서드로 할당


> function 은 기본적으로 함수 선언으로 사용하는것을 목적으로 처음에 만들었는데
> this binding으로 기능이 추가되었다 어떤 기능이 추가되었냐하면 생성자 함수로 사용하는 프로퍼티
> 프로토 타입의 생성자 함수에 의해서 new 키워드를 만나서 생성자로 사용됭수 있다
> new 로 생성한 스코프에서 this 가 객체를 참조하기떄문에