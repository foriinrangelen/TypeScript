////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                인터페이스 알아보기                                                  //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 인터페이스란?- 타입별칭과 비슷하게 타입에 이름을 지어주는 또다른 문법
// 객체의 구조를 정의하는데 특화(상속, 합침등의 특수한 기능을 제공)

// 인터페이스 기본문법
// 간단한 Person 타입을 interface로 정의해보기
interface Person {
  name: string;
  age: number;
}

// 정의한 인터페이스를 타입 주석으로 타입정의하기
const person: Person = {
  name: "김유열",
  age: 27,
};
// => 타입별칭과 문법만 조금 다를 뿐 기본적인 기능은 거의 같다

// 선택적 프로퍼티, 읽기전용 프로퍼티
// 인터페이스에서도 동일한 방법으로 선택적 프로퍼티 설정가능
interface Person1 {
  readonly name: string;
  age?: number;
}

const person1: Person1 = {
  name: "김유열",
  // age: 27, // 선택적 프로퍼티로 인해 안쓰기 가능
};

person.name = "222"; // ❌ 읽기전용이라서 불가능

// 메서드 타입정의하기
interface Person2 {
  readonly name: string;
  age?: number;
  sayHi: () => void;
}
// 함수 타입 표현식을 이용해 메서드 타입 정의,
// 함수 타입 표현식 말고 호출 시그니처를 이용해 메서드 타입정의 하기도 가능
interface Person2 {
  readonly name: string;
  age?: number;
  sayHi1(): void;
}

// 메서드 오버로딩
// 함수 타입 표현식으로 메소드의 타입을 정의하면 메소드의 오버로딩 구현 불가
interface Person3 {
  readonly name: string;
  age?: number;
  sayHi1: () => void;
  // sayHi: (a: number, b: number) => void; // ❌
}

// 호출시그니처 사용하여 메서드타입을 정의하면 오버로딩 구현 가능
interface Person3 {
  readonly name: string;
  age?: number;
  sayHi(): void;
  sayHi(a: number): void;
  sayHi(a: number, b: number): void;
}

// 인터페이스 확장하기
// 하나의 인터페이스를 다른 인터페이스들이 상속받아 중복된 프로퍼티를 정의하지 않도록 도와주는 문법

// 각각 Animal 타입을 기반으로 각각의 타입들이 추가적인 프로퍼티들을 가지고있는
// 상태일때
interface Animal {
  name: string;
  color: string;
}

interface Dog extends Animal {
  isBark: boolean;
}
const dog: Dog = {
  name: "",
  color: "",
  isBark: true,
};

interface Cat extends Animal {
  isScratch: boolean;
}

interface Chicken extends Animal {
  isFly: boolean;
}
// 와같이 interface 타입이름 extends 확장_할_타입이름 형태로
// extends 뒤에 확장할 타입의 이름을 정의 하면 해당타입에 정의된 모든프로퍼티를
// 가지고 올 수 있다 따라서 Animal을 상속받은 타입들은 name, age의 프로퍼티를 가지게된다
// 이때 확장 대상인 Animal 타입은 나머지 타입들의 슈퍼타입이 된다

// 프로퍼티 재정의하기
interface Animal {
  name: string;
  color: string;
}

//   interface Dog extends Animal {
// 	name: string; // 타입 재 정의
// 	breed: string;
//   }

// 와 같이 슈퍼타입의 프로퍼티를 가져와서 자식타입에서 재정의가 가능하다
// 하지만 프로퍼티를 재정의할 때
// 재정의하는 프로퍼티는 그전 슈퍼타입 프로퍼티의 슈퍼타입이 되도록 재정의 해야한다
// 예를들어 Aniaml타입의 name이 string 타입이면 재정의하는 Dog타입에서는
// name 프로퍼티는 string 타입의 서브타입이여야 한다

// 타입별칭을 확장, 다중확장
// 인터페이스뿐만아니라 타입별칭으로도 정의된 객체도 확장가능
type Animal1 = {
  name: string;
  color: string;
};

interface Dog1 extends Animal1 {
  breed: string;
} // 가능

// 여러개의 인터페이스를 확장하는 것 또한 가능하다
interface DogCat extends Dog, Cat {}

const dogCat: DogCat = {
  name: "",
  color: "",
  isScratch: true,
  isBark: false,
  // age:20
};

// 선언합치기
// 타입별칭은 같은 스코프내에서 같은 이름으로 선언이 불가능하지만 인터페이스는 중복가능하다 => 인터페이스는 모든선언이 합쳐지게 된다
// 타입별칭예시
type Person4 = {
  name: string;
};

//   type Person4 = { ❌
// 	age: number;
//   };

// 인터페이스 예시
interface Person {
  name: string;
}

interface Person {
  // ✅
  age: number;
}

// 따라서 위코드에서의 인터페이스 선언은 아래와 같은 인터페이스가 된다
interface Person {
  name: string;
  age: number;
}

// 이렇게 동일한 이름의 인터페이스 들이 합쳐지는 것을 '선언합침' 이라고한다

interface Person {
  name: string;
}

interface Person {
  age: number;
}

const person2: Person = {
  name: "김유열",
  age: 27,
};
// 따라서 다음과 같이 사용가능
// 주의사항
// 동일한 이름의 인터페이스들이 동일한 이름의 프로퍼티를 서로 다른 타입으로 정의 한다면
// 오류 발생
interface Person {
  name: string;
}

interface Person {
  // name: number; // 에러발생, 이러한 상황을 '충돌' 이라고 표현하며 선언합침에서는 충돌은 허용하지 않음
  age: number;
}
