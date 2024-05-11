// 타입 단언
// 타입스크립트에서의 타입 단언이란 컴파일러에게 "내가 이미 이변수의 타입을 알고있으니 이렇게 처리해줘" 하고 알려주는 것

// 타입 단언의 규칙
// 값 as 단언 = 단언식이라고 하며 A as B 일때
// A가 B의 슈퍼타입이거나 A가 B의 서브타입 이여야한다

type Person = {
  name: string;
  age: number;
};
// 같이 Person타입이 선언이 되어있을 때

// let person= {} // 과같이 미리 선언을 해두고
// person.name="김유열"; // 에러
// person.age= 27;       // 에러
// 처럼 나중에 프로퍼티를 할당하려고 하면 에러가 난다
// 타입추론에 의해 {} 타입으로 추론되어버리기 때문

let person = {} as Person; // 으로 타입단언하여 타입을 미리알려줘서 해결
// Person 타입으로 추론된다
person.name = "김유열";
person.age = 27;

// 2
type Person1 = {
  name: string;
  age: number;
};

let kyy: Person1 = {
  name: "김유열",
  age: 27,
  //	blood: "B", // 에러발생
};
// 와 같이 선언하면 초과프로퍼티가 발동해서 에러발생,

let kyy1 = {
  // 자동으로 kyy 변수가 Person타입으로 추론된다
  name: "김유열",
  age: 27,
  blood: "B",
} as Person; // 으로 타입단언해줘서 해결가능

// 규칙 예제
let num1 = 10 as never; // 가능
let num2 = 10 as unknown; // 가능
// let num3 =10 as string; // 불가능, 서로 슈퍼 서브 관계가 아니기때문에

// 아래와 같이 다중단언으로 에러를 피해가는 방법도 있음
let num4 = 10 as unknown as string;

// const 단언

let num5 = 10 as const; // 하게되면 10리터럴 타입으로 추론된다

let cat = {
  name: "고양이",
  color: "white",
} as const; // => 객체의 프로퍼티들이 readonly 로 바뀐다

// non Null 단언

type Post = {
  title: string;
  auther?: string; // 없을수도 있기때문에 선택적프로퍼티문법
};

let post: Post = {
  title: "게시글1",
  auther: "김유열",
};

// const len: number= post.auther?.length;
// 은 옵셔널체이닝으로 인해 undefinded 가 할당될수도 있기때문에 에러발생

const len: number = post.auther!.length;
// ? 를 !로 바꿔줘서 undefined나 null이 아닐거라고 알려줘서 컴파일러속이기가능

// 주의사항
// 컴파일러를 믿도록 하는 것이기 때문에 위험, 확실한 경우에만 사용
