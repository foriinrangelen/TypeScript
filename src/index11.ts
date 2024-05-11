/**
 * 제네릭 알아보기
 * 제네릭이란?: 함수나 인터페이스, 타입별칭, 클래스 등을 다양한 타입과 함께 동작하도록 만들어주는 타입
 */
// 제네릭이 필요한 상황
function func(value: any) {
  return value;
}

let num = func(10);
// any 타입

let str = func("string");
// any 타입
// 위와 같은 상황에서는 다양한 타입의 매개변수를 제공받아야 하기 때문에 value 타입을 일단 any타입으로 설정,
// 이함수는 인수로 전달한 값을 그대로 반환하는 함수이다 따라서 변수 num에는 10이 저장되고 변수 str에는 "string"이 저장된다
// 그런데 현재 num과 str 타입은 any타입으로 추론된다(함수의 return기준으로 추론되었기때문에)
// any타입으로 추론되면 숫자열에도 문자열함수 등이 사용이 가능해져버리기 때문에 굉장히 위험한 상황
// 우리가 원하는건 인수로 number 타입의 값을 전달하면 반환타입이 number 타입이 되고 인수로 string 타입의 값을 전달하면 반환타입이 string이 되길원함
// 이러한 경우에 제네릭을 활용하여 해결이 가능하다

// 제네릭함수 => 두루두루 모든 타입의 값을 다적용할 수 있는 범용적인 함수
// 문법
function func1<T>(value: T): T {
  return value;
}

// number 타입
let num1 = func1(10);
// string 타입
let str1 = func1("string");
// 함수명뒤에 <T>(타입 변수라 칭함), 매개변수의 타입도 T, 반환타입도 T
// T에 어떤타입이 할당될지는 함수가 호출될때 결정
// func(10)처럼 Number타입의 값을 인수로 전달하면 매개변수 value에 Number타입의 값이 저장되면서 T가 Number타입으로 추론된다
// 이때 func함수의 반환값 타입 또한 Numner 타입이된다

// 제네릭함수를 호출할 때 다음과 같이 타입변수에 할당할 타입을 직접명시하는것도 가능하다
// 아래와 같은 함수에서 func2함수가 number튜플타입을 반환하도록 하고싶다면?
function func2<T>(value: T): T {
  return value;
}

let arr = func2<[number, number, number]>([1, 2, 3]);
// <>안의 [number, number, number] 타입이 T에 할당되고, 매개변수와 리턴타입 모두 튜플타입이 된다
// 만약 위 코드에서 타입변수에 할당할 타입을 튜플타입으로 설정하지 않았다면 T가 조금 더 범용적인 number[] 타입으로 추론되었을 것
// 하지만 대다수의 상황에서는 알아서 잘 추론되기 때문에 굳이 타입변수를 설정하지 않아도 된다

// 타입변수 응용하기
// 사례1- 2개의 타입변수가 필요한 사례
function swap<T, U>(a: T, b: U) {
  return [b, a];
}

const [a, b] = swap("1", 2);
// T는 string 타입으로, U는 number타입으로 추론된다

// 사례2- 다양한 배열 타입을 인수로받는 사례
function returnFirstValue<T>(data: T[]) {
  return data[0];
}

let num2 = returnFirstValue([0, 1, 2]);
// number

let str2 = returnFirstValue([1, "hello", "mynameis"]);
// number | string

//함수 매개변수의 data 타입을 `T[]` 로 설정했기 때문에 배열이 아닌값은 인수로 전달될 수 없으며 T는 배열의 요소타입으로 할당된다
//첫번째 호출에서 인수로 `Number[]` 타입의 값을 전달했으므로 T는 number 타입으로 추론되며 함수의 반환값 타입은 number타입이 된다 (data[0] 가 number타입을 반환하기때문)
//두번째 호출에서는 인수로 `(String | Number)[]` 타입의 값을 전달했으므로 이때의 T는 `String | Number` 타입의 유니온타입으로 추론되며 함수의 반환값은 `String | Number` 이 된다
//위의 예시에서는 `let str = returnFirstValue([1, "hello", "mynameis"]);` 의 첫번재 매개변수로 number가 들어와버려서 `String | Number` 으로 추론된다
// 여기서 반환값의 타입을 첫번째 요소의 타입이 되도록 하려면 다음과 같이 튜플타입과 나머지 파라미터를 이용하면된다
// 튜플타입 + ...unknown 으로 첫번째 요소의 타입은 T, 나머지요소의 타입은 ...unknown으로 길이도 타입도 상관없도록 정의
function returnFirstValue1<T>(data: [T, ...unknown[]]) {
  return data[0];
}

let str3 = returnFirstValue1([1, "hello", "mynameis"]);
// str3은 number 타입이 된다

// 사례3- 타입변수를 제한하는 사례
// 타입변수를 제한한다는 것은 함수를 호출하고 인수로 전달할 수 있는 값의 범위에 제한을 두는것
// 타입변수를 적어도 length 프로퍼티를 받는 객체타입으로 제한한 예시
// 타입변수를 **제한할때에는 확장(extends) 를 이용**

// 아래와 같이 `T extends { length : number }` 라고 정의하면 T는이제 `{ length : number }` 객체타입의 서브타입이 되며
// 이제 T는 무조건 number타입의 프로퍼티 length 를 가지고 있는 타입이 되어야 한다.
function getLength<T extends { length: number }>(data: T) {
  return data.length;
}

// 인수로 length 프로퍼티가 존재하는 String 타입의 값을 전달 했으므로 허용
getLength("123"); // ✅

// 인수로 length 프로퍼티가 존재하는 Number[] 타입의 값을 전달 했으므로 허용
getLength([1, 2, 3]); // ✅

// 인수로 length 프로퍼티가 존재하는 객체 타입의 값을 전달 했으므로 허용
getLength({ length: 1 }); // ✅

// 인수로 undefined을 전달했으므로 오류가 발생(length 프로퍼티가 없음)
// getLength(undefined);        // ❌

// 호출은 인수로 null을 전달했으므로 오류가 발생(length 프로퍼티가 없음)
// getLength(null);             // ❌
