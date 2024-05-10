// 객체 끼리의 타입 호환에서는 프로퍼티를 기준으로 슈퍼타입을 결정한다 
// ⇒ 프로퍼티가 더 적은게 슈퍼(부모) 타입이다 그래서 위와같은 예제에서는 animal객체는 2개의 공통된 프로퍼티를가지고있고 
// dog 객체에서는 breed라는 프로퍼티를 추가로 가지고있기때문에 animal 객체가 슈퍼타입이 된다. 
// 즉 animal타입의 객체는 dog타입으로 다운캐스팅이 불가능 하나 dog타입객체는 animal타입으로 업캐스팅이 가능하다

// book 타입
type Book= {
	name: string;
	price: number;
};

// ProgrammingBook 타입
type ProgrammingBook= {
	name: string;
	price: number;
	skill: string;
};

let book:Book;
let programmingBook: ProgrammingBook ={
	name: "한 입 크기로 잘라먹는 리엑트",
	price: 33000,
	skill: "reactjs",
}

// 와 같을 때
// Book 타입과 ProgrammingBook 타입의 관계는 Book의 프로퍼티가 더적고
// 공통된 프로퍼티를 전부 가지고 있기 때문에 Book 타입이 슈퍼타입이다
// 그래서 
book = programmingBook; // 가 가능하다
// 하지만 
let book2:Book ={
	name: "한 입 크기로 잘라먹는 리엑트",
	price: 33000,
	// skill: "reactjs", // 에러발생
}; 

// 둘다 같은 기능을 하는 코드지만 아래는 되고 위는 되지않음
// ⇒ 객체리터럴형식으로 넣게되면 '초과프로퍼티 검사' 를 진행하기때문이며
// Book 타입에 딱 맞게 객체리터럴을 할당해야함

// let book3: Book = programmingBook; 처럼 변수에 할당해서 초기화를 해주면
// 초과 프로퍼티 검사를 피해갈 수 있음, 
// 함수에 argument(parameter)로 객체를 사용할때에도 이런식으로 담아두어서 사용해야함