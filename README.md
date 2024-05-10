## 타입스크립트 시작하기
### 자바스크립트와 타입스크립트의 차이
1. 자바스크립트는 런타임에서 동작할 때 타입오류를 확인하지만 **타입스크립트는 코드 작성단계에서 타입오류를 확인**한다
2. 타입스크립트는 처음에 타입을 지정해주지 않아도 처음 **초기화 된값으로 타입을 추론**한다

### 타입스크립트 동작원리
1. 코드를 AST(추상문법트리)로 변환
2. 타입검사 => 검사에 실패한다면 컴파일 종료, 성공한다면 AST를 자바스크립트로 변환하고 타입과 관련된 코드는 전부제거


### 타입스크립트 환경설정
`npm init -y && npm i typescript tsx -g && npm i @types/node `
#### 1. `npm init` (npm 초기화)
#### 2. `npm i @types/node` (타입정보 가지고있는 타입노드 패키지 불러오기)
#### 3. `npm i typescript -g` (타입스크립트 컴파일러 설치 tsc -v로 설치확인)
> #### 만약 tsc: 이 시스템에서 스크립트를 실행 할 수 없으므로.. 에러발생 시
> Windows PowerShell 관리자권한으로 실행 > get-executionpolicy 로 현재 권한상태확인 (Restricted)가 표시된다면 Set-ExecutionPolicy RemoteSigned 로 권한변경
#### 4. `npm i -g tsx` (컴파일과 동시에 JS파일 실행, 오류 발생 시 관리자 권한으로 실행, ex tsx src/index.ts)
### tsconfig.json
```json
{
  "compilerOptions": {
    "skipLibCheck": true,
    "target": "ESNext",
    "module": "ESNext",
    "outDir": "dist",
    "strict": true,
    "moduleDetection": "force",
    
  },
  "include": ["src"]
}
```
