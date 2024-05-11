// 타입 좁히기
// 조건문 등을 이용해서 넓은타입에서 좁은 타입으로 타입을 상황에 따라 좁히는 방법을 '타입가드' 라고한다

// value에 두가지 타입이 들어올 수 있기때문에 분기처리
// value => number : toFixed 출력
// value => string : toUpperCase 출력
function f1(value: number | string) {
  value; // number | string union 타입으로 추론
  if (typeof value === "number") {
    // 타입가드 방식(조건문이 다른타입막아주는중)
    console.log(value.toFixed()); // number타입으로 추론
  } else if (typeof value === "string") {
    console.log(value.toUpperCase()); // string타입으로 추론
  }
}
// number | string 의 union타입으로 정의했는데 조건문안에서 타입이 변경
// 되는 이유는 타입스크립트가 더 좁은타입으로 좁혀주기 때문

// 타입가드의 종류 (+ instanceof, in)
function f2(value: number | string | Date) {
  if (typeof value === "number") {
    console.log(value.toFixed());
  } else if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else if (typeof value === "object") {
    console.log(value.getTime()); // 이경우는 잘작동하지만
  }
}

function f3(value: number | string | Date | null) {
  if (typeof value === "number") {
    console.log(value.toFixed());
  } else if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else if (typeof value === "object") {
    //	console.log(value.getTime());  // null 이 추가 되면 에러발생, null도 typeof value=== "object"의 타입가드를 뚫을 수 있기때문에
  }
}

function f4(value: number | string | Date | null) {
  if (typeof value === "number") {
    console.log(value.toFixed());
  } else if (typeof value === "string") {
    console.log(value.toUpperCase());
    // A instanceof B : A 가 B의 인스턴스인지 확인(B는 타입이여선 안되고 )
    // class 이여야한다
  } else if (value instanceof Date) {
    console.log(value.getTime()); // instanceof로 해결가능
  }
}

// in 예제
// Person타입 정의 후
type Person = {
  name: string;
  age: number;
};

function f5(value: number | string | Date | null | Person) {
  // Person 추가

  if (typeof value === "number") {
    console.log(value.toFixed());
  } else if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else if (value instanceof Date) {
    // age 프로퍼티를 가질 수 있는게 Person밖에 없기때문
    console.log(value.getTime());
    // value에 null이 들어올수도 있기때문에 value && 로 빈값이 아님을 확인
  } else if (value && "age" in value) {
    console.log(`${value.name}은 ${value.age} 살입니다`);
  }
}
