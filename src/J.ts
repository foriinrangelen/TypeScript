// 타입스크립트 클래스
// 타입스크립트에서는 클래스의 필드를 선언할때에는 타입주석으로 타입을 함께 정의 해줘야한다
// 그렇지 않으면 함수 매개변수와 동일하게 암시적 any타입으로 추론되는데 strict옵션이 true라면 에러가 발생힌다
// 추가로 생성자에서 각 필드의 값을 초기화 하지않을 경우 초기값도 함께 명시해줘야 한다!
class Employee {
  // 필드
  name: string = "";
  age: number = 0;
  position: string = ""; // 초기값 설정

  // 메서드
  work() {
    console.log("일함");
  }
}

// 초기값설정할게 마땅히 없다면
class Employee1 {
  // 필드
  name: string;
  age: number;
  position: string; // 초기값 설정이 필요없음

  // 생성자
  // 생성자내에서 초기화시 필드에서 초기값 설정이 필요없음
  constructor(name: string, age: number, position: string) {
    this.name = name;
    this.age = age;
    this.position = position;
  }

  // 메서드
  work() {
    console.log("일함");
  }
}
const employeeB = new Employee1("1", 20, "dev");
console.log(employeeB);

// 타입스크립트의 클래스는 타입으로도 활용가능하다
//   class Employee {
// 	(...)
//   }
// 와같이 Employee 클래스를 만들었지만 아래 객체에서 타입으로 활용
const employeeC: Employee1 = {
  name: "",
  age: 0,
  position: "",
  work() {},
};

// 타입스크립트에서의 클래스상속
// 타입스크립트에서 상속을 이용할때 파생클래스(확장하는 클래스)에서 생성자를 정의했다면 반드시 super() 메소드를 호출해서
// 슈퍼클래스(확장되는 클래스)의 생성자를 호출해야하며 호출위치는 생성자의 최상단 이여야한다
class ExecutiveOfficer extends Employee1 {
  officeNumber: number;

  constructor(
    name: string,
    age: number,
    position: string,
    officeNumber: number
  ) {
    super(name, age, position); // 부모클래스 필드 가져오기
    this.officeNumber = officeNumber;
  }
}

/**
 * 타입스크립트 클래스 접근제어자 알아보기 (access modifier)
 * 타입스크립트에서만 제공되는 기능, 클래스의 특정 필드나 메서드를 접근할 수 있는 범위를 설정하는기능
 * public: 모든 범위에서 접근가능 (접근제어자를 사용하지 않으면 default 값)
 * private: 클래스 내부에서만 접근가능
 * protected: 클래스 내부 또는 파생클래스 내부에서만 접근가능
 */
class Employee2 {
  // 필드
  name: string;
  age: number;
  position: string; // 초기값 설정이 필요없음

  // 생성자
  // 생성자내에서 초기화시 필드에서 초기값 설정이 필요없음
  constructor(name: string, age: number, position: string) {
    this.name = name;
    this.age = age;
    this.position = position;
  }

  // 메서드
  work() {
    console.log("일함");
  }
}
const employeeD = new Employee2("1", 20, "dev");
employeeD.age = 30;

// private
class Employee3 {
  // 필드
  private name: string;
  private age: number;
  private position: string; // 초기값 설정이 필요없음

  // 생성자
  // 생성자내에서 초기화시 필드에서 초기값 설정이 필요없음
  constructor(name: string, age: number, position: string) {
    this.name = name;
    this.age = age;
    this.position = position;
  }

  // 메서드
  work() {
    console.log(`${this.name} 일함`); // 과 같이 메서드 내에서만 접근가능
  }
}
const employeeE = new Employee3("1", 20, "dev");
// employeeE.age=30; private 이기때문에 접근불가, 읽을수 조차 없음
// class ExecutiveOfficer extends Employee 처럼 파생클래스에서 조차 접근이 불가능
// 파생클래스에서는 접근이 가능하게 하고싶다면? protected를 사용하면된다

// 접근제어자 사용해서 필드, this할당 생략하기
class Employee4 {
  // 필드를 생략
  // private name: string;
  // private age: number;
  // private position: string;

  // 생성자에서 접근 제어자를 표시해준다면 필드를 생략해야한다
  constructor(
    public name: string,
    private age: number,
    protected position: string
  ) {
    //   this.name = name;
    //   this.age = age;
    //   this.position = position; 또한 자동으로 값도 초기화 해주기때문에 할당해줄 필요가 없음
  }

  // 메서드
  work() {
    console.log(`${this.name} 일함`); // 과 같이 메서드 내에서만 접근가능
  }
}

/**
 * 인터페이스와 클래스
 */
// 여기서의 interface는 class의 설계도 역할을 한다
interface CharacterInterface {
  name: string;
  moveSpeed: number;
  move(): void;
}

// implements 키워드를 사용해서 구현
// 주의사항
// interface로 implements 해서 구현하는 class들은 접근제어자가 무조건 public이다
class Character implements CharacterInterface {
  constructor(
    public name: string,
    public moveSpeed: number,
    private extra: string // 다른 접근제어자가 필요하다면 class 생성자 내에서 구현
  ) {}

  move(): void {
    console.log(`${this.moveSpeed}속도로 이동`);
  }
}
