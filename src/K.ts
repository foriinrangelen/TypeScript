/**
 * ✅제네릭 알아보기
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

//  map 메서드에 타입스크립트 적용해보기
const arr1 = [1, 2, 3];
const newArr1 = arr1.map((value) => value * 2); // [2,4,6]

function map<T>(arr: T[], callback: (i: T) => T) {
  let result = [];
  for (let i = 0; i < arr1.length; i++) {
    result.push(callback(arr[i]));
  }
  return result;
}
map(arr1, (it) => it * 2);
map(["hello", "world"], (it) => it.toUpperCase());
// map(["hello", "world"], (it) => parseInt(it)); 에러발생 string타입이 들어와서 반환값타입도 string타입으로 추론되기때문
// 위의 map 함수에서 들어오는 배열에 따라 타입이결정되어야 한다
// 하지만 꼭 string배열이 들어온다고 return 타입도 string배열이 될필요가 없다 이러한경우
// 제네릭타입변수를 하나만사용하면안되고 두개이상의 타입변수를사용해야한다
function map1<T, U>(arr: T[], callback: (item: T) => U) {
  let result = [];
  for (let i = 0; i < arr1.length; i++) {
    result.push(callback(arr[i]));
  }
  return result;
}
map1(["hello", "world"], (it) => parseInt(it));
// 이러한 경우에서는 string 배열타입이 들어와서 T에 string[] 타입할당, callback함수의 매개변수 타입도 string타입이되지만
// 콜백함수의 return타입은 (it) => parseInt(it) 이때 number타입으로 추론이 되어서 U에 number타입이 들어온다

// forEach 메서드에 타입스크립트 적용해보기
const arr2 = [1, 2, 3];
arr2.forEach((it) => console.log(it));

function forEach<T>(arr: T[], callback: (item: T) => void) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i]);
  }
}
forEach(arr2, (it) => console.log(it.toFixed()));
forEach(["hello", "world"], (it) => console.log(it.toUpperCase()));

// 제네릭 인터페이스와 제네릭 타입별칭

/**
 * 제네릭 인터페이스
 */
interface KeyFair<K, V> {
  key: K;
  value: V;
}

// 제네릭 인터페이스는 제네릭함수와 다르게 타입으로 정의할때 반드시 꺽쇠를 열고 타입을 직접할당 해주어야 한다
let keyFair: KeyFair<string, number> = {
  key: "hello",
  value: 0,
};

let keyFair2: KeyFair<boolean, string[]> = {
  key: true,
  value: ["hello", "world"],
};

// 이렇게 하나의 제네릭 인터페이스로 여러개의 객체를 정의할 수 있다

// 제네릭인터페이스와 객체의 인덱스시그니처를 활용하면 굉장히 유연한 객체타입을 만들 수 있다
// 인덱스 시그니처란?
interface NumberMap {
  [key: string]: number; // 와같이 key와 value의 규칙만 만족하면 어떤객체든 허용하는 유연한 문법
}
// 예시
let numberMap1: NumberMap = {
  key: 1234,
  ket2: 12345,
};

// 제네릭+ 인덱스시그니처 활용한 인터페이스
interface Map<V> {
  [key: string]: V;
}

let stringMap: Map<string> = {
  key: "value",
  key2: "value2",
};

let booleanMap: Map<boolean> = {
  key: true,
};
// 와같이 유연하게 활용가능

// 제네릭 타입별칭(제네릭 인터페이스와 문법만 다르지 거의 동일)
type Map2<V> = {
  [key: string]: V;
};

let stringMap2: Map2<string> = {
  key: "value",
};

/**
 * 제네릭 인터페이스의 활용 예시
 * -> 유저 관리 프로그램
 * -> 유저구분: 학생유저 / 개발자 유저
 */

interface Student {
  type: "student";
  school: string;
}

interface Developer {
  type: "developer";
  skill: string;
}

interface User {
  name: string;
  profile: Student | Developer;
}

const developerUser: User = {
  name: "김유열",
  profile: {
    type: "developer",
    skill: "typescript",
  },
};

const studentUser: User = {
  name: "김유열",
  profile: {
    type: "student",
    school: "",
  },
};

function goToSchool(user: User) {
  if (user.profile.type === "student") {
    console.log(user.profile.school);
  } else {
    console.log(user.profile.skill);
  }
}
interface Student {
  type: "student";
  school: string;
}

interface Developer {
  type: "developer";
  skill: string;
}

// 와같이도 타입가드를 통해 좁힐 수 있지만 제네릭을 활용하여 아래처럼 가능하다
interface User1<T> {
  name: string;
  profile: T;
}
const developerUser1: User1<Developer> = {
  name: "김유열",
  profile: {
    type: "developer",
    skill: "typescript",
  },
};

const studentUser1: User1<Student> = {
  name: "김유열",
  profile: {
    type: "student",
    school: "",
  },
};

function goToSchool1(user: User1<Student>) {
  const school = user.profile.school;
  console.log(`${school}로 등교완료`);
}
// 같이 제네릭을 활용하여 타입좁히기를 하지않아도 된다

/**
 * 제네릭 클래스 알아보기
 */

class NumnerList {
  constructor(private list: number[]) {}

  push(data: number) {
    this.list.push(data);
  }
  pop() {
    return this.list.pop();
  }
  print() {
    console.log(this.list);
  }
}
const numberList = new NumnerList([1, 2, 3]);
numberList.pop();
numberList.push(4);
numberList.print();
// stringList를 만들려면? 반복작업이 들어가기때문에 제네릭으로 해결
class List<T> {
  constructor(private list: T[]) {}

  push(data: T) {
    this.list.push(data);
  }
  pop() {
    return this.list.pop();
  }
  print() {
    console.log(this.list);
  }
}
const stringList = new List(["hello", "world"]);
stringList.pop();
stringList.push("TS");
stringList.print();

/**
 * 프로미스와 제네릭
 */
// 비동기 결과의 값이 number임을 제네릭문법으로 알려줌
const promise = new Promise<number>((resolve, reject) => {
  setTimeout(() => {
    // resolve(20);
    reject("~~때문에 실패"); //선택적 any타입으로 추론되기때문에 아무거나 넣어도 된다
  }, 3000);
});
promise.then((result) => {
  console.log(result * 10); //20
});
promise.catch((err) => {
  //   console.log(err);
  if (typeof err === "string") console.log(err); // 와같이 주로 사용
});
// 정리 : 비동기 결과값인 resolve의 값의 타입은 제네릭으로 정해줄 수 있지만 reject의 값은 지정해줄 수 없다(any로 알아서 추론된다)

// 프로미스를 반환하는 함수의 타입을 정의해보기
interface Post {
  id: number;
  title: string;
  content: string;
}
// 함수의 반환값으로 Promise<Post>해주든 프로미스 자체에 <Post> 해주든 둘다 사용가능하지만 주로 함수의 반환값으로 Promise<Post>하는걸 추천
// 협업관점에서 함수의 리턴값을 바로 알아보기가 쉬움
function fetchPost(): Promise<Post> {
  return new Promise<Post>((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: 1,
        title: "게시글 제목",
        content: "게시글 컨텐츠",
      });
    }, 5000);
  });
}

const postRequest = fetchPost();
postRequest.then((post) => {
  post.id;
});
