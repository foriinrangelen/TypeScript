// 원시타입

// 1. number (정수,소수,NaN,infinity 등 전부 통용) 숫자전용메소드만 사용가능
let num1: number= 123; // : number =>주석(annotation)
let num2: number= 0.123;

// 2. string ("", '', ``, `${}` 등 전부 통용) 문자열전용 메소드만 사용가능
let str1: string= "hello";  
let str2: string= `hello ${num1}`;

// 3. boolean (true, false 만 사용가능)
let bool1: boolean= true;  
let bool2: boolean= false;

// 4. null (null 만 사용가능)
let null1: null= null;  

// 5. undefined (undefined 만 사용가능)
let unde1: undefined= undefined;

// 6. 리터럴 타입(타입에 명시된 값만 들어올 수 있음!!)
// 리터럴 -> 값
let numA: 10= 10;
let strA: "hello"= "hello";
let boolA: "true"= "true";

// 2. 배열, 튜플
// 2-1. 배열
let numArr: number[]= [1,2,3];

let strArr: string[]= ["hello","hello1","hello2"];

// ✅제네릭 문법, 제네릭문법으로도 배열 타입선언가능
let boolArr: Array<boolean>= [true,false,true];

// 배열에 들어가는 요소들의 타입이 다양할 경우(유니언 문법)
let multiArr: (number | string)[]= [1, "hello"];

// 다차원 배열의 타입을 정의하는 방법
let doubleArr: number[][]= [[1, 2, 3],[4, 5]]

// 2-2. 튜플(JS에는없고 TS에만 존재,길이와 타입이 고정된 배열)
// 컴파일될때는 그냥 배열로 되기때문에 push,pop등 배열 메소드 사용가능
// 그래서 push,pop 등 메소드로 길이에 변경이 가능해져버림=> 주의해서 사용
let tup1: [number,number]= [1, 2];
let tup2: [number, string, boolean]= [1, "2", true];

// 고차원 튜플 => 튜플타입으로 배열안의 배열에 요소 타입순서를 강제해줄 수 있다
let users: [string,number][]= [["김유열", 1],["김유열1", 11]];

// 3. 객체

let user: object= {
	id:1,
	name:"김유열"
};
// 그냥 object로 정의하면 user.id 같이 프로퍼티에 접근할 수 없음
// '객체 리터럴 타입' 으로 프로퍼티 타입까지 전부정의
let user1: {
  // 프로퍼티 key뒤에 ? 선언하면 있어도 되고 없어도 되지만 있을거면 number 타입
  // 선택적 프로퍼티(optional property) 라고한다
	id?: number; 
	name: string; 
}= {
	id:1,
	name:"김유열"
};
// readonly 타입앞에 설정시 수정불가능
let config: {
	readonly apiKey: string;
}= {
apiKey: "MY API KEY",
}

// 4. 타입 별칭과 인덱스 시그니처                              

// 4-1. 타입 별칭
// 같은 Scope 내에서는 타입명 사용 중복불가
let user3: {
	id: number;
	name: string;
	nickname: string;
	birth: string;
  bio: string;
	location: string;
}= {
	id: 1,
	name: "김유열",
	nickname: "minato",
	birth: "1997-01-07",
	bio: "안녕하세요",
	location: "광주광역시"
};
// 이렇게 사용하게 되면 너무 길어짐 => 타입별칭으로 대응
// 타입별칭 
type User= {
	id: number;
	name: string;
	nickname: string;
	birth: string;
  bio: string;
	location: string;
} // 미리선언해두고 User타입으로 사용
let user4: User= {
	id: 1,
	name: "김유열",
	nickname: "kyyy8629",
	birth: "1997-01-07",
	bio: "안녕하세요",
	location: "광주광역시"
};

// 4-2. 인덱스 시그니처
// 1. 무조건 있어야하는 프로퍼티는 명시를 해줘야 에러를 띄워줌
// 2. 타입별칭 선언시 따로 다른 타입으로 선언불가
// [key: string]: string; 형식과 같이 다른 프로퍼티도 맞춰줘야함
// key와 value의 규칙을 기준으로 타입을 선언
type CountryCodes= {
	[key: string]: string; // key string, value string 만 들어올 수 있음
	// korea: number;
}

let countryCodes: CountryCodes= {
	Korea: "ko",
	UnitedState: "us",
	UnitedKingdom: "uk",
    // UnitedKingdom1: 1, 에러
};

// 인덱스 시그니처 문법 사용시 주의점 
let countryCodes2: CountryCodes= { }; // 에러가 발생하지 않음

// 빈 객체를 넣어도 규칙을 어긴 프로퍼티가 없다고 판단하기 때문에 
// 아무 프로퍼티도 사용을 하지않아도 에러가 나지않는다
type CountryCodes2= {
	[key: string]: string; // 여기와
	 korea: string; // 여기타입이 일치해야한다
}
// 처럼 꼭 필요한 프로퍼티가 있다면 추가로 타입을 작성해주자
// 이렇게 추가로 프로퍼티 타입 명시 시에는 반드시 
// 인덱스 시그니처의 타입과 일치 또는 호환이 되어야 한다


// 5. Enum 타입(열거형 타입)- JS에는 없고 TS에만 존재                              
// 여러가지 값들에 각각 이름을 부여해 열거해두고 사용하는 타입
// Enum은 특이하게도 Compile되어도 사라지지 않음!! (자바스크립트 객체로 변환)
enum Role {
	ADMIN= 0,
	USER= 1,
	GUEST= 2,
	// 숫자를 할당하지 않아도 자동으로 0부터 할당됨
	// 10 부터 할당해도 +1씩 순차적으로 할당됨
	// 중간에 10을 할당하면 10다음부터 +1로 할당
	// 숫자가 할당되면 숫자형 enum
}

enum Language {
	korean= "ko",
	english= "en"
}

const user5= {
	name: "김유열",
	role: Role.ADMIN, // 관리자	
	language: Language.korean, // "ko"
};

const user6= {
	name: "유저1",
	role: Role.USER, // 일반유저	
};

const user7= {
	name: "유저2",
	role: Role.GUEST, // 게스트
};


// 6. Any 타입 & Unknown 타입
// 6-1. Any 타입
// 특정 변수의 타입을 우리가 확실히 모를때 사용 (모든타입이 들어갈 수 있음)
let anyVar: any= 10;
anyVar= "hello" // TS에서도 할당가능
anyVar= true;
anyVar= {};
anyVar= () => {};

anyVar.toUpperCase();
anyVar.toFixed();

let num: number= 10;
num= anyVar; // 도 가능

// 런타임 에러의 위험성!! 최대한 사용지양

// 6-2. unknown 타입
let unknownVar: unknown;

unknownVar= "";
unknownVar= 1;
unknownVar= ()=>{};

if(typeof unknownVar === "number"){
	num= unknownVar;
} 
// 타입정제
// unknown 타입은 모든타입을 any와 비슷하게 저장할 수는 있지만
// 다른타입의 변수에는 집어넣을 수 없음!!
// toUpperCase()메소드 연산 등등 수행불가
// 타입을 명확히 명시해줘야만 사용가능


// 6. Void 타입 & Never 타입

// 6-1. void 타입 (아무것도 없음을 의미, 함수에서 return문을 사용하지않을때 사용)
function func1(): string { //리턴타입 정의해주기
	return "hello"
}

function func2(): void { //리턴타입 정의해주기
	console.log("hello");
}

let a: void; 
// a= 1;
// a= "hello";
// a= {};      // 전부 불가
a= undefined; //만 가능
// tsconfig에서 strictNullChecks 을 false하면 null 도 가능
// a= null;

// 6-2. never 타입 (존재하지않는, 불가능한타입 반환값자체가 있는게 모순이다 할때 사용)
function func3(): never {
	while (true) {}
}

function func4(): never {
	throw new Error(); // 에러를 던지는 메소드
}

let a1: never; //가능 ,그러나 아무것도 절대 담을 수 없음(any타입도 절대불가)


// 추가
// unknown 타입은 슈퍼타입, 최상단(모두 담을 수 있음)
// 모든타입 업캐스팅 가능, 다운캐스팅은 불가
function unknownExam(){
	let a: unknown= 1;
	let b: unknown= "hello";
	let c: unknown= true;
	let d: unknown= null;
	let e: unknown= undefined;
}

// Never 타입(공집합): 모든타입의 서브기때문에 업캐가능 다캐불가
// never 타입은 어떤값도 저장되어서는 안되는 변수의 타입으로 활용하면 좋음!
function neverExam(){
	function neverFunc():never {
		while (true){}
	}
}

// void 타입(함수의 리턴이 필요 없을때 사용)
function voidExam(){
	function voidFunc():void {
		console.log("hi");
		return undefined; // 가능 why? underfined타입의 슈퍼타입이기때문
	}
}

//any 타입
// 타입상으로는 unknown타입의 밑에 위치하지만 치트키 타입이다 뭘해도 가능
// 무슨타입이여도 업캐스팅 다운캐스팅 전부가능
// never타입에만 다운캐스팅 불가
function anyExam(){
	let unknownVar: unknown;
	let anyVar: any;

	anyVar= unknownVar; // 가능
}