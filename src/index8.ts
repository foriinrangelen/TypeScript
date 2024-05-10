// 함수와 타입

// ✅ 함수타입 정의하기
// 어떤 [타입의] 매개변수를 받고 어떤 [타입의] 결과값을 반환하는지 이야기
function f1(a: number, b: number): number { // 반환타입을 적지않아도 추론해줌
	return a + b;
}

// ✅ 화살표 함수 정의하기
const add= (a: number, b: number): number => a + b; // 반환타입 생략가능

// ✅ 함수의 매개변수
function introduce(name= "김유열") { //기본값 설정, 기본값 기준으로 타입추론
	console.log(`name: ${name}`);
}

// 매개변수 추가
function introduce1(name= "김유열", tall: number) { 
	console.log(`name: ${name}`);
}
// 일때 tall 을 생락하고 싶다면 ? 추가해서 선택전 매개변수
// tall은 number | undefinded 의 유니언타입을 추론
function introduce2(name= "김유열", tall?: number) { 
	console.log(`name: ${name}`);
// 에러발생, tall에 undefined가 들어올수도 있기 때문에
	// console.log(`tall : ${tall+10}`); // 에러!
}

function introduce3(name= "김유열", tall?: number) { 
	console.log(`name: ${name}`);
// 타입가드로 해결가능
if(typeof tall === "number") {
	console.log(`tall : ${tall + 10}`); // tall이 number로 좁혀짐
	}
}
// 선택적 매개변수의 주의사항
// 선택적 매개변수는 필수매개변수들의 맨뒤에 배치해야 한다

// ✅rest parameter (매개변수가 얼마나 들어올지 모른다면?)
// JS의 문법, 들어온 argument들을 배열로 반환해준다
function getSum(...rest: number[]) { 
	let sum = 0;
	rest.forEach(it=> sum+= it);
	
	return sum
}
getSum(1,2,3) // 6
getSum(1,2,3,4,5) // 15, 에러없이 정상작동

// 그래도 parameter의 길이를 고정해주고싶다면?
function getSum1(...rest: [number, number, number]) {}
// 와 같이 튜플 타입으로 선언

////////////////////////////////////////////
//     함수타입 표현식과 호출 시그니처     //
//////////////////////////////////////////
// ✅ 함수 타입표현식
// 와같이 타입별칭을 사용하여 타입정의 가능 => 함수 타입 표현식(호출시그니쳐?)
type Add= (a: number, b: number)=> number;

type Operation= (a: number, b: number)=> number;
const add1: Operation= (a, b) => a + b;

const sub: Operation= (a, b) => a - b;
const multiply: Operation= (a, b) => a * b;
const divide: Operation= (a, b) => a / b;
// 와 같이 돌려쓰기 가능

const add3: (a: number, b: number)=> number = (a, b) => a + b; // 도 가능

// ✅ 호출 시그니처 (콜 시그니처)
function func(a: number): void {} // 에서 (a: number): void 만떼서 객체안에 정의

// 자바스크립트 함수도 사실 객체다
type Operation2= {
		(a: number, b: number): number;
		name: string; // 처럼 프로퍼티를 정의해줄수도 있지만 거의 안씀(하이브리드 타입)
};

const add2: Operation2= (a, b) => a + b;
const sub2: Operation2= (a, b) => a - b;
const multiply2: Operation2= (a, b) => a * b;
const divide2: Operation2= (a, b) => a / b;

  /////////////////////////////////
 //      함수타입의 호환성       //     
/////////////////////////////////
// 특정 함수 타입을 다른 함수 타입으로 취급해도 괜찮은가를 판단하는 방식
// 1. 반환값의 타입이 호환되는가
// 2. 매개변수의 타입이 호환되는가

// 기준 1. 반환값이 호환되는가
type A= ()=> number; // type A= (): number; 와 같다
type A1= (a: number, b: number)=> number
type B= ()=> 10;

let a: A =()=> 10;
let b: B =()=> 10;

a= b; // 가능
// b= a; // 불가능, b가 number 리터럴 타입이기때문에 더 좁은 타입이라 다운캐스팅 불가

// 기준 2. 매개변수가 호환되는가
// 2-1. 매개변수의 개수가 같을 때
type C= (value: number) => void;
type D= (value: number) => void;

let c: C= (value) => {};
let d: D= (value) => {};

c= d;
d= c; // 둘다 가능
// 하지만

type C1= (value: number) => void;
type D1= (value: 10) => void; // value의 타입이 더 좁아진다면

let c1: C= (value) => {};
let d1: D= (value) => {};

c= d; // 에러발생, 매개변수를 기준으로 호환성을 판단할때에는 '업캐스팅'일때 호환불가
d= c; 
// 굉장히 신기한현상, 왜그럴까?
type Animal ={
	name: string,
}

type Cat ={
	name: string,
	color: string,
};

let animalFunc= (animal: Animal)=>{
	console.log(animal.name)
};
let catFunc= (cat :Cat)=>{
	console.log(cat.name);
	console.log(cat.color);
};

// animalFunc= catFunc; // 불가능, 이 할당식은 밑의 코드와 같음

let testFunc= (animal: Animal) => {
	console.log(animal.name);
	// console.log(animal.color); // catFunc를 넣었으니까 catFunc의 본문을따라감 하지만 animalFunc에는 color프로퍼티가 없다 이러한 상황때문에 업캐스팅을 막아둠
                   
}
// 반대의 상황 catFunc= animalFunc 는 가능
// cat타입이 animal타입의 프로퍼티를 전부 가지고 있기 때문(다운 캐스팅이 가능)

// 2-2. 매개변수의 개수가 다를 때
type Func1= (a: number, b: number)=> void;
type Func2= (a: number)=> void;

// func1= func2; // 가능
// func2= func1; // 불가능, func1의 매개변수가 더 많기 때문에
// => 매개변수의 개수가 더 적을때에만 호환이가능(타입자체가 틀려버리면 안됨)

  /////////////////////////////////////////
 //            함수 오버로딩             //     
/////////////////////////////////////////
// 하나의 함수를 매개변수의 개수나 타입에 따라 다르게 동작하도록 만드는 문법
/**
 * 함수 오버로딩
 * 같은 함수를 매개변수의 개수나 타입에 따라
 * 여러가지 버전으로 만드는 문법
 * -> 하나의 함수 func
 * -> 일단 모든 매개변수는 넘버타입
 * -> Ver1. 매개변수가 1개일 때에는 매개변수에 20을 곱한 값을 출력
 * -> Ver2. 매개변수가 3개일 때에는 모든 매개변수를 더한 값을 출력
 */

// 버전들 -> 오버로드 시그니쳐 라고하며 먼저 알려줘야한다
function func1(a: number): void;
function func1(a: number, b: number, c: number): void;
// 위 코드에서는 2개의 오버로드 시그니쳐를 만들었으며 각각 함수의 버전을 의미합니다. 
// 위 코드는 func 함수는 매개변수를 1개 받는 버전과 3개 받는 2개의 버전이 있다고 알리는 것 과 같습니다.
// 오버로드 시그니쳐를 만들었다면 다음으로는 구현 시그니쳐를 만들어줘야 합니다. 
// 구현 시그니쳐는 실제로 함수가 어떻게 실행될 것인지를 정의하는 부분입니다.

// 실제 구현부 -> 구현 시그니쳐
function func1(a: number, b?: number, c?: number) { // 선택적 프로퍼티
  if (typeof b === "number" && typeof c === "number") { // 있다면 3개짜리함수
    console.log(a + b + c);
  } else {
    console.log(a * 20); // 아니라면 하나 짜리함수
  }
}

func1(1);        // ✅ 버전 1 - 오버로드 시그니쳐
// func1(1, 2);     // ❌ 
func1(1, 2, 3);  // ✅ 버전 3 - 오버로드 시그니쳐
//이렇게 구현부 없이 선언부만 만들어둔 함수를 ‘오버로드 시그니쳐’라고 한다. 

// 구현 시그니쳐의 매개변수 타입은 모든 오버로드 시그니쳐와 호환되도록 만들어야 합니다. 
// 따라서 위 코드에서는 매개변수 b와 c를 선택적 매개변수로 만들어 매개변수를 하나만 받는 첫번째 오버로드 시그니쳐와도 호환되도록 만들어 주었습니다.

  ////////////////////////////////////////////////////////////////////////
 //                        사용자 정의 타입가드                         //     
////////////////////////////////////////////////////////////////////////
type Dog= {
	name: string,
	isBark: boolean,	
};

type Cat1= {
	name: string,
	isScratch: boolean,	
};

type Animal1= Dog | Cat; 

function warning(animal: Animal) {
		if("isBark" in animal) {
		// 강아지
	} else if ("isScratch" in animal) {
		// 고양이
	}
}

// 프로퍼티로 타입을 좁히면 별로 좋지 않다
// 이럴때 사용자 정의 타입가드로 좁히기
// 강아지타입인지 검사하는 함수
function isDog(animal: Animal): animal is Dog { // true를 반환한다면 animal은 Dog타입
		return (animal as Dog).isBark !== undefined // return 안에서 타입단언
}

function warning1(animal: Animal) {
		if(isDog(animal)) {
		// 강아지
		animal; // Dog타입으로 잘 추론한다
	} else if ("isScratch" in animal) {
		// 고양이
	
	}
}