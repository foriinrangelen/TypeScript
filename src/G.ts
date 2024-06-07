// 서로소 유니온타입
// 교집합이 없는 타입들로만 만든 유니온 타입을 말하며, 태그를 붙여서 타입을 구분할 수도 있기 때문에 taged union type이라고도 한다

// 회원을 관리하는 예시

type Admin = {
  name: string;
  kickCount: number;
};

type Member = {
  name: string;
  point: number;
};

type Guest = {
  name: string;
  visitCount: number;
};

type User = Admin | Member | Guest;

// Admin => {name}님 현재까지 {kickCount}명 강퇴했습니다
// Member => {name}님 현재까지 {point} 모았습니다
// Guest => {name}님 현재까지 {visitCount}번 오셨습니다

function login(user: User) {
  if ("kickCount" in user) {
    // admin 타입
    console.log(`${user.name}님 현재까지 ${user.kickCount}명 강퇴했습니다`);
  } else if ("point" in user) {
    // Member 타입
    console.log(`${user.name}님 현재까지 ${user.point} 모았습니다`);
  } else if ("visitCount" in user) {
    // Guest 타입
    console.log(`${user.name}님 현재까지 ${user.visitCount}번 오셨습니다`);
  }
}

// 서로소 유니온타입 변경해보기
// 회원을 관리하는 예시 2

type Admin1 = {
  tag: "ADMIN"; // tag 추가
  name: string;
  kickCount: number;
};

type Member1 = {
  tag: "MEMBER"; // tag 추가
  name: string;
  point: number;
};

type Guest1 = {
  tag: "GUEST"; // tag 추가
  name: string;
  visitCount: number;
};

// 각각의 타입에 tag에 string literal 타입을 추가해줘서 서로소 유니온타입이 된다
type User1 = Admin1 | Member1 | Guest1;

function login1(user: User1) {
  if (user.tag === "ADMIN") {
    // 처럼 타입가드 변경
    // admin 타입
    console.log(`${user.name}님 현재까지 ${user.kickCount}명 강퇴했습니다`);
  } else if (user.tag === "MEMBER") {
    // 처럼 타입가드 변경
    // Member 타입
    console.log(`${user.name}님 현재까지 ${user.point} 모았습니다`);
  } else if (user.tag === "GUEST") {
    // 처럼 타입가드 변경
    // Guest 타입
    console.log(`${user.name}님 현재까지 ${user.visitCount}번 오셨습니다`);
  }
}

// switch 문으로 하면 깔끔
function login2(user: User1) {
  switch (user.tag) {
    case "ADMIN":
      console.log(`${user.name}님 현재까지 ${user.kickCount}명 강퇴했습니다`);
      break;
    case "MEMBER":
      console.log(`${user.name}님 현재까지 ${user.point} 모았습니다`);
      break;
    case "GUEST":
      console.log(`${user.name}님 현재까지 ${user.visitCount}번 오셨습니다`);
      break;
    default:
      console.log("알 수 없는 사용자 타입입니다.");
      break;
  }
}

// 서로소 유니온타입을 사용하면 좋은사례 (비동기 작업의 결과를 처리하는 객체)
type LoadingTask = {
  state: "LOADING";
};

type FailedTask = {
  state: "FAILED";
  error: {
    message: string;
  };
};

type SuccessTask = {
  state: "SUCCESS";
  response: {
    data: string;
  };
};

// 각각의 타입에 string literal 타입이 존재하기 때문에 타입좁히기로 타입가드가능
type AsyncTask = LoadingTask | FailedTask | SuccessTask;

function processResult(task: AsyncTask) {
  switch (task.state) {
    case "LOADING": {
      console.log("로딩중");
      break;
    }
    case "FAILED": {
      console.log(`에러 발생 :${task.error.message}`);
      break;
    }
    case "SUCCESS": {
      console.log(`성공 :${task.response.data}`);
      break;
    }
  }
}
