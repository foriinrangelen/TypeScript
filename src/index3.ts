// 대수 타입
// 여러개의 타입을 합성해서 새롭게 만들어 낸 타입
// 합집합 타입과 교집합 타입이 존재

// 1. Union 타입 (합집합 타입)
let a : string | number;
let b : string | number | boolean; // 계속 추가가능
let arr: (number| string| boolean)[] = [1,"hello", true]
a= 1;
a= "hello" // 둘 다 들어갈 수 있음

b= 1;
b= "hello"
b= true; // 도 가능

type Dog= {
	name: string;
	color: string;
}
type Person= {
	name: string;
	language: string;
}
// 타입별칭 (type as) 으로도 유니언타입 가능
type Union1= Dog | Person

let union1: Union1= {
	name: "",
	color:"",
}

let union2: Union1= {
	name: "",
	language:"",
}

let union3: Union1= {
	name: "",
	color:"",
	language:"",
}
// 까지는 전부가능(에러안남) 그러나

//let union4: Union1= {
//	name: "",
//} // 은 에러발생 why?

/* union1 타입을 Dog| person 로 정의 하면 union1은 dog객체의 프로퍼티를 전부 가지기때문에 가능
   union2는 person의 프로퍼티를 전부 가지기때문에가능, union3은 dog 타입과 person 타입의 프로퍼티를 합집합 형식으로 전부 가지고 있기때문에 가능
   그러나 union4는 dog타입과 person타입의 합집합 어디 부분에도 들어가 있지 않기때문에 불가능하다(합집합 개념으로 이해) */

// 교집합타입 (intersection)

let variable: number & string; // => 공집합, never 타입이 된다
// intersection 타입은 기본타입으로 만들게되면 웬만해서는 대부분
// never 타입 why? 기본타입들 중에서는 겹치거나 공유하는 부분이
// 거의 없음
// 그래서 대부분 intersection타입은 주로 객체타입에 사용

type Dog1= {
	name: string;
	color: string;
}

type Person1= {
	name: string;
	language: string;
}
// 타입별칭 (type as)
type Intersection= Dog1 & Person1

let intersection: Intersection= {
	name: "",
	color:"",
	language:"", 
}
// 로 전부 타입들에 정의되어있는 프로퍼티들을 가져와야한다(교집합)
// 교집합이 되려면 dog 타입과 person 타입 전부 만족해야하기 때문