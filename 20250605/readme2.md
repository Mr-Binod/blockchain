# 타입스크립트 

1. 타입스크립트를 사용하는 이유
2. 타입스크립트 문법
3. 타입스크립트 node의 런타임 환경
4. 타입스크립트 설정 파일 tsconfig
5. 타입스크립트 빌드 (compile, transfile)



## typescript 

> 자바스크립트에서 타입의 정의가 추가된 언어
> 객체 지향적인 사고방식과 추상화의 개념을 가지고 사용해야하는 언어
> 자바스크립트가 있는데 왜 타입스크립트를 사용해야하는가? 

### javascript 와 typescript
> javascript 는 무척 편하게 사용할수  있도록 제고하는것을 목표로 개발했던 언어. (타입의 제한이 없고)
편하게 개발에만 몰두할수 있도록 코드작성에만 집중할수 있도록 목표로 가지고 개발했다. 

> 자바스크립트는 실행하기 전까지 에러를 알수가 없고 작업을 할때 코드의 내용이 모호해진다. 예측할수 없는 오류 즉 코드의 내용에서 는 파악이 힘들다. 대규모의 프로젝트를 진행할때 작업을 하면서 코드의 량이 증가할텐데 이런 번번히 발생하는 타입의 오류를 실행환경에서 테스트를 해야알수 있기때문에 코드를 수정할때 번번히 오류가 발생하는 문제를 극복하기 위해서 타입스크립트를 개발하게 된것.

> 타입스크립트는 자바스크립트에서 확장된 언어 자바스크립트의 상위 집합 슈퍼셋 (상위 확장)

### 객체지향 프로그래밍의 형태를 제공
- 클래스
- 상속
- 갭슐화
- 다형성
- 추상화 (abstraction)

객체지향의 원칙 찾아보기

### 추상화 즉 현실에 있는 내용을 바탕으로 프로그래밍에서 쉽게 다룰수 있도록 설계하는것
> 추상 클래스는 클래스의 형태를 정의 하기위해서

> 새 -> 날개 -> 동물 -> 숨을 쉰다 

```js

class 생물 {

}

class 동물 extends 생물 {

}

class 새 extends 동물 {
    
}
class 비듈기기 extends 새 {

}
class 참새 extends 새 {

}

```

- 추상이라는 것은 구체적인 실체하는 것에섯 생각을 시작
- 추상화하는 것은 특정 분석에서 핵심 요소를 가지고 구조화 즉 설계하는것
- 추상화가 될수록 점점 원형을 해치게된다. 너무 과한 추상화는 가족성이 떨어질수 있다. 
- 목표는 프로그래밍에서 추상화를 사용하는 이유
- 유지보수 -> 물건을 판매하는 기능을 담당하는 클래스 -> 판매의 가격을 담당하는 클래스(할인의 기능을 넣어준다) -> 장바구니 클래스 -> 결제 기능을 담당하는 클래스 
- 개발 생산성 향상 개발할때 많은 고민을 할수 잇는 힘이 생긴다.
- 하위 요소들에세 추상화한 상위 요소를 상속해서 사용하는 목표를가지고 있다.


### typescript 환경 설정 설정

```sh
npm install -g typescript // # 전역 패캐지로 설치 (-g global 전역 설치)
tsc --version # typescript version check
tsc --init # typescript 설정 파일 생성성

```

> 자바스크립ㅈ트로 변환이 될때 트랜스파일 될때 필요한 속성들을 정의하는 파일
> tsconfig.json
> typescript 사용할때 vs 챙ㄷ 에서 즉 편집기에서 타입스크립트 내장 언어 지원 기능을 사용할수 있다.


### typescript transfile
```sh
npx tsx # 설정파일을 읽고 패킺디를 실행시켜서 파일을 컴파일한다, 즉 파일 변환이 일어난다 설정파일에 속성을 가진다



// 블록

// 헤더 ---------- 
// 블록의 버전 : 네트워크 버전
// 블록의 높이 : 0 ~ 증가하는 인덱스의 값 블록의 순서
// 블록의 생성 시간 : 채굴하고 트랜젝션의 내용이 담긴 생성 시간간
// 블록의 이전 블록 해시 : 이전 블록의 해시값 ( 이전 블록의 모든 데이터를 더하고 sha256 해시 문자열 변화한 값 )
// 블록의 해시 : 현재 블록의 모든 값을 더하고 해시한 값 
// 블록의 논스 : 쉽게 말해서 증명 작업의 횟수 채굴 알고리즘의 반복 횟수
// 블록의 난의도 : 작업증명 방식에서 블록 생성시간 목표에 도달하기위해서 사용하는 값 해시문자의 0 의 갯수를 난이도로 표현하다
// 마이닝때 작업증명 알고리즘을 풀고 블록의 바디 즉 거래내용을 가지고 해시문자열을 만드는데 논스를 증가시켜서 해시 문자열을 계속 다르게 만들어서 난이도에 도달하면 블록을 생성하고 브로드케스트 해서 블록생성이 확정되면 보상을 얻는다
// 블록의 난이도 : 1 
// 01011100011010010
// 바디 -------------
// 블록의 내용 : 블록에 기록될 내용 위변조 불가능한 내용 ( 거래 내용, 상태 변수 )



### 이력서

> 내 프로젝트에 내용
> 프로젝트의 목차 지금 생각 날때 본인만의 스초리를 만들수 있는 재료 gpt 저장 용량이 많다
> 야 내가 지금까지 질문한 내용이나 작업한 내용을 가지고 이력서를 만들어줄래 스토리도 있게

목차 => 내용

> 한줄 자기소개 
> 블로그 깃헙 배포 링크 가장 상단에
> 자바스크립트를 20권 공부한 개발자
> 타입스크립트와 자바스 크립트를 모뎐 자바스크립트에서 정족 20 한 개발자
> 이력서에 요즘 트랜드는 프로필 사진 오른쪽
> 16px 글자 크기 크게
> 컨텐츠 영역이 명확하게 구분될수 있도록 ( 편의성 )


```


```js
class sw {
    constructor () {

        let starttime;
        let intervalId;
    }
    start () {
        console.log(starttime, 'starttime')
    }
}