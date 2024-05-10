// 타입계층

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