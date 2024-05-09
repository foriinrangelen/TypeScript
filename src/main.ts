// 타입종류

/// 문자
let str: string
let red: string= "Red"
let green: string= "Green"
let myColor: string= `my color is ${red}`
let yourColor: string= 'Your color is'+ green

/// 숫자
let num: number
let integer: number= 6
let float: number= 3.14
let infinity: number= Infinity
let nan: number= NaN

/// 불린
let isBoolean: boolean
let isDone: boolean= false

/// Null / Undefined 거의 사용X
let nul: null
let und: undefined
/// 배열
const fruits: string[]= ['Apple', 'Banana', 'Cherry'];
const numbers: number[]= [1,2,3,4,5,6,7];
// 다차원 배열의 타입을 정의하는 방법
let doubleArr: number[][]= [[1, 2, 3],[4, 5]]
// 유니온타입 배열
const union: (string| number)[]= ['Apple', 1, 2, 'Banana', 3];

/// 객체
const obj: object= {}
const arr: object= []
const func: object= ()=>{} 
// 처럼 typeof로 object로 나오는것은 전부 들어갈 수있기때문에 object 타입은 거의 안씀
// readonly 타입앞에 설정시 수정불가능
let config: {
	readonly apiKey: string;
}= {
apiKey: "MY API KEY",
}

interface User {
    name: string
    age: number
    isValid: Boolean    
} // interface로 타입 선언후 재사용하기(대문자로 시작)

const userA: User= { // 와 같이 사용가능
    name: "Heropy",
    age: 85,
    isValid: true
}
const userB: {
    name: string
    age: number
    isValid: Boolean
}= {
    name: "Neo",
    age: 22,
    isValid: false
}

/// 함수 (매개변수1 타입 + 매개변수1 타입) => 함수리턴값
const add: (x:number, y:number) => number= (x, y)=>{
    return x + y
}
// 와 같이 함수표현식에 타입지정가능
const add2= (x:number, y:number):number => {
    return x + y
}
const add3= function(x:number, y:number):number {
    return x + y
}
const a: number= add(1,2);

// 함수의 리턴값이 없을때는 void로 리턴타입을 명시
const hello= ():void=> {
    console.log('Hello World!')
}
const h: void= hello();

// TS에서만 존재하는 타입
/// Any

/// Unknown
/// Tuple 타입(JS에는없고 TS에만 존재,길이와 타입이 고정된 배열)
// 컴파일될때는 그냥 배열로 되기때문에 push,pop등 배열 메소드 사용가능
// 그래서 push,pop 등 메소드로 길이에 변경이 가능해져버림=> 주의해서 사용
let tup1: [number,number]= [1, 2];
let tup2: [number, string, boolean]= [1, "2", true];
// 고차원 튜플 => 튜플타입으로 배열안의 배열에 요소 타입순서를 강제해줄 수 있다
let users: [string,number][]= [["김유열", 1],["김유열1", 11]];

/// Void
/// Never
/// Union
/// Intersection