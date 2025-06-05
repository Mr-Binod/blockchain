
// 원시 타입입

let message : string = 'hello Typescript';
let count : number = 123;

const el : HTMLDivElement | null = document.querySelector("./item");
// 타입을 추론할때 내가 알려줄게 이 타입의 값이 들어있는 변수야
(el as HTMLDivElement).onclick = (e : MouseEvent) => {
    // e.target as 
}
// el as HTMLDivElement.onclick is invalid

// const add = (count : string) : number => { // the return type will be number
const add = (count : number) => {
    const add_count : number = 1;
    return count + add_count

}

console.log(message);



let isActive : boolean = false;
let hash : string = "0asdl0";  // 진수는 숫자형 데이터가 맞다 . 
// 하지만 우리가 사용할때 문자열로 사용한다
let initValue : any = '123'; // 여러 타이브 넣을수 있다 이거는 쓰면 안된다.
// any 타입 검사를 할수 없는 경우가 생긴다.

// 모듈 시프템 라이브러리 @types/express 
// 다입의 모듈 시스템 라이브러릴에서 타입의 모듈을 제공하지 않은 경우 진짜 불가피한경우 사용해라
let initValue2 : undefined = undefined;
let initValue3 : null = null;

let initValue4 : unknown = "123";

// any unknown difference
//  any 는 무슨 값인지 아예 몰라. 완전 타입검사를 강력하게 풀었다
// unknown 타입을 특정할수는 없는데 검사는 또 하고싶어 검증은 필요해


initValue = 1;

// unknown 값을 재할당할때 조건이 필요하다
// 조건문 이후에 사용을 해야한다
if(typeof initValue4 === "number") {
    initValue4 = 1;
    console.log(initValue)
}


// 참조 타입

let list : number[] = [1,2,3,4,5]  // array type is number
let list2 : Array<number> = [1,2,3] 
// generic style

// stringt str[] =    in other languages

// arr(123)<string>

// const arr = (num : number) : <T> => {
//     const add = num + 1
//     return add
// }

let list3 : [string, number] = ['id', 1];
list3[0].replace("i", "");

list[1] // number
// 고정의 사이즈와 각 요소의 타입을 정의하는 형태를 튜플 타입


const add1 = (a : number, b : number) : void => {  // viod  if no return value
    a + b;
}
const add2 = (a : number, b : number) : number => {  // viod  if no return value
    return  a + b;
}

// object 
// creating class using literal way
// 추상 클래스 객체의 형태를 정의해서 사용
// interface 추상 클래스 선언 예약어
// I 대문자를 이름 앞에 붙여서 명시
interface IBlock {
    id : string,
    num : number
}

// extends and implements are different in implement we cant use the key value in
// parent class
// implements 추상 클래스를 상속 즉 형태를 상속받는다.
// extends 속성을 상속 받는다
// class Block implements IBlock {
//     id : string
//     num : number
//     constructor (_id : number) {
//         this.id = _id;
//     }
// }


// let object : IBlock = {
//     id : "123",

// }

