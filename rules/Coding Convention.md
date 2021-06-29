# 코딩 컨벤션

### 참고자료

[Airbnb code convention style](https://velog.io/@zzzz465/Node.js-apidoc-%EC%9C%BC%EB%A1%9C-%EB%AC%B8%EC%84%9C%EB%A5%BC-%EB%A7%8C%EB%93%A4%EA%B3%A0-gulp%EB%A1%9C-%EC%9E%90%EB%8F%99%ED%99%94-vscode%EC%97%90-%EB%93%B1%EB%A1%9D%ED%95%98%EA%B8%B0)

[apidoc 블로그](https://velog.io/@zzzz465/Node.js-apidoc-%EC%9C%BC%EB%A1%9C-%EB%AC%B8%EC%84%9C%EB%A5%BC-%EB%A7%8C%EB%93%A4%EA%B3%A0-gulp%EB%A1%9C-%EC%9E%90%EB%8F%99%ED%99%94-vscode%EC%97%90-%EB%93%B1%EB%A1%9D%ED%95%98%EA%B8%B0)

[apidoc 공식문서](https://apidocjs.com/#param-api-success)

---

### 탭 사이즈는 2로 한다.

- \t 가 아닌 space로 사용한다.
- [File] - [Settings] - [tab Size] 검색 - 2로 설정

---

### 한 줄의 최대 길이는 80자로 제한한다.

- [File] - [Settings] - [Word Wrap Column 검색]

---

### 네이밍 규칙

- 변수, 함수, 인스턴스는 기본적으로 Camel Case를 사용한다.

    ex) camelCase

- 함수는 동사+명사로 구성한다.

    ex) getUserInformation()

- Class, Constructor, Interface는 Pascal Case(= upper 카멜 케이스)를 사용한다.

    ex) IUser

- 네이밍 길이
    - 길이는 20자 이내로 제한한다.
    - 4단어 이상이 들어가거나, 부득이하게 20자 이상이 되는 경우 팀원과의 상의를 거친다.
- flag 변수
    - 조동사+flag 종류로 구성한다.

        ex) isNum, hasNum

- 약어는 되도록 사용하지 않는다.

    ```tsx
    let idx; // bad
    let index; // good
    
    let cnt; // bad
    let count; // good
    
    let arr; // bad
    let array; // good
    
    let seoul2Bucheon; // bad
    let seoulToBucheon; // good
    ```

    - 약어가 부득이하게 필요할 경우는 팀원과의 상의를 거친다.

---

### 최대 tab depth의 제한

- tab의 최대 depth는 4로 제한한다.
- 이 이상으로 depth가 깊어지면 함수를 통해 나눌 수 있도록 한다.
- 개선이 어렵다면, 팀원과의 코드리뷰를 거친다.

    ```tsx
    function func() {
      //tab1
      if() {
        //tab2
        array.reduce((pre, cur) => {
          //tab3
          if(cur == status) {
            //tab4
          }
        }
      }
    }
    ```

---

### 코멘트 (Comments)

- 복수 주석을 `/** ... */` 를 사용하고, 단일행이면 `//` 를 사용한다.
- **함수에 대한 코멘트**
    - backend에서 공통적으로 사용하는 함수의 경우, 모듈화를 통해 하나의 파일로 관리한다.
    - 문서를 apidoc로 사용할 경우
        - 파일 시작 부분에 주석으로 상세 내용을 작성한다.
            - **함수의 전체 기능**에 대한 설명
            - 함수의 파라미터에 대한 설명 ( {type} 역할 )
            - router or api 는 성공 여부도 적어준다.
            - 프로퍼티들
                - `@api {method} path [title]`
                - `@apiName name`
                - `@apiGroup name`
                - `@apiParam [(group)] [{type}] [field=defaultValue] [description]`
                - `@apiSuccess [(group)] [{type}] field [description]`

            ```tsx
            /**
             * @api {get} /user/:id Request User information
             * @apiName GetUser
             * @apiGroup User
             *
             * @apiParam {Number} id User's unique ID.
             *
             * @apiSuccess {String} firstname Firstname of the User.
             * @apiSuccess {String} lastname  Lastname of the User.
             */
            ```

---

### 괄호

- `if` `while` `for` 문 괄호 뒤에 한 칸을 띄우고 사용한다.

    ```tsx
    if (left == true) {
    	// logic
    }
    ```

---

### 공백 (Whitespace)

- 주요 중괄호 ({}) 앞에는 스페이스를 1개 넣는다.

    ```tsx
    // good
    function test() {
      console.log('test');
    }

    // good
    dog.set('attr', {
      age: '1 year',
      breed: 'Bernese Mountain Dog',
    });
    ```

- 제어구문 (`if` `while` 등) 의 소괄호 (()) 앞에는 스페이스를 1개 넣는다.

    ```tsx
    // good
    if (isJedi) {
      fight();
    }
    ```

- 연산자 사이에는 스페이스를 넣는다.

    ```tsx
    // good
    const x = y + 5;
    ```

- 블록에 빈 행을 끼워 넣지 않는다.

    ```tsx
    // bad
    function bar() {

      console.log(foo);

    }

    // also bad
    if (baz) {

      console.log(qux);
    } else {
      console.log(foo);

    }

    // good
    function bar() {
      console.log(foo);
    }

    // good
    if (baz) {
      console.log(qux);
    } else {
      console.log(foo);
    }
    ```

- 소괄호(())와 대괄호([]) 안쪽에 스페이스를 추가하지 않는다.

    ```tsx
    // bad
    function bar( foo ) {
      return foo;
    }

    // good
    function bar(foo) {
      return foo;
    }

    // bad
    const foo = [ 1, 2, 3 ];
    console.log(foo[ 0 ]);

    // good
    const foo = [1, 2, 3];
    console.log(foo[0]);
    ```

- 중괄호({}) 안쪽에 스페이스를 추가한다.

    ```tsx
    // bad
    const foo = {clark: 'kent'};
    
    // good
    const foo = { clark: 'kent' };
    ```

---

### 세미콜론

- 쓰자!

    ```tsx
    // good
    (() => {
      const name = 'Skywalker';
      return name;
    })();
    ```

---

### magic number 지양

- magic number나 문자열을 비교할 경우, constant.ts에 상수화 하여 관리한다.
- 에러 메세지를 반환할 필요가 있는 경우
    - constant.ts에 상수를 대문자로 생성한다.
    - const SUCCESS_ERROR_MESSAGE = '성공 어쩌구';

```tsx
//constant.js
const LEFT = 'left';

//other_logic_file.js
if(dir === LEFT) {
  //...
}
```

---

### else if

- 불가피한 경우를 제외하고 else if의 사용을 최대한 줄인다.
- 조건을 만족하면 탈출하는 if로 구현하는 등

---

### 비동기 함수의 사용

- Promise 함수는 지양하고 async, await을 사용한다.
- Promise를 사용해야하는 경우, 주석으로 표시하고 commit에 그 이유를 명시한다.

---

### MongoDB 네이밍 규칙

- 데이터베이스
    - 전부 소문자로 작성한다.
    - case sensitive하기 때문에 대소문자 구별에 주의한다.
    - 가독성 좋게 구분자를 넣는 것이 권유되고, 구분자는 '-'나 '_'를 사용한다.
- 컬렉션
    - 소문자를 사용한다.
    - $, 공백, NULL, System 접두사 사용이 금지된다.
    - 가독성 좋게 구분자를 넣는 것이 권유되고, 구분자는 '-'나 '_'를 사용한다.
    - 복수형을 권장한다.
- 필드
    - 카멜케이스를 사용한다.
    - 구분자를 사용하지 않아도 되지만, '_'는 사용이 가능하다.
    - 모호한 표현은 피한다.
    - 가능한 짧으면서 의미가 명확하게 명명한다.