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