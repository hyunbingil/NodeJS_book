# 🚑 2장. 알아두어야 할 자바스크립트
## 🔨 1. 호출 스택, 이벤트 루프
### 1) 호출 스택
#### ⚡️ 예시
: 밑의 코드 순서 예측\
=> 세 번째 -> 두 번째 -> 첫 번째
``` js
function first() {
    second();
    console.log("첫 번째");
}

function second() {
    third();
    console.log("두 번째");
}

function third() {
    console.log("세 번째");
}

first();
```
<img src="./img/1-5.PNG">

#### 🔒 호출 스택
: 함수의 호출, 자료 구조의 스택
- Anonymous은 가상은 전역 컨텍스트 (항상 있다고 생각하는게 좋음)
- 함수 호출 순서대로 쌓이고, 역순으로 실행됨
- 함수 실행이 완료되면 스택에서 빠짐
- LIFO 구조라서 스택이라 불림

### 2) 이벤트 루프(+ 호출 스택)
#### ⚡️ 예시2
: 밑의 코드 순서 예측\
=> 시작 -> 끝 -> 3초 후 실행
``` js
function run() {
    console.log("3초 후 실행");
}
console.log("시작");
setTimeout(run, 3000);
console.log("끝");
```
- 호출 스택만으로는 설명이 안 됨(run은 호출 X했는데?)\
=> 호출 스택 + 이벤트 루프로 설명 가능.

- 백그라운드로 가게 되면 호출 스택에서 다른 작업이 가능하다.\
: 이 때, 호출 스택이 백그라운드 보다 먼저 끝나야한다.

1. 실행 전 호출 스택에 anonymous 들어가기\
<img src="./img/캡처.PNG">

2. console.log 실행\
<img src="./img/캡처2.PNG">

3. setTimeout 실행\
<img src="./img/캡처3.PNG">

4. 백그라운드에 타이머(3초) 저장\
<img src="./img/캡처4.PNG">

5. console.log 실행\
<img src="./img/캡처5.PNG">

6. 코드 종료, anonymous 없어짐\
<img src="./img/캡처6.PNG">

7. 3초 후 태스크 큐에 run 들어감\
<img src="./img/캡처7.PNG">

8. 호출 스택에 run 들어감(실행)\
<img src="./img/캡처8.PNG">

9. run 안의 console.log 실행\
<img src="./img/캡처9.PNG"><img src="./img/캡처10.PNG">

10. run 종료 및 JS 종료\
<img src="./img/캡처11.PNG">

## 🔨 2. ES2015+ 문법
### 1) var, const
: ES2015 이전에는 var로 변수를 선언
=> but, ES2015부터는 const와 let이 대체
#### 🔒 기존 : 함수 스코프
: function() {}이 스코프의 기준점
- 다른 언어와는 달리 if나 for, while은 영향을 미치지 X.
- const와 let은 함수 및 블록({})에도 별도의 스코프를 가짐.\
=> function으로 감싸면 얘도 바깥으로 뛰쳐 나갈 수 X.
``` js
if (true) {
    var x = 3;
}
console.log(x); // 3
```
#### 🔒 ES2015 이후 : 블록 스코프
: 블록에서 선언 했으면 바깥에 뛰쳐 나갈 수 없음
``` js
if true {
    const y = 3;
}
console.log(y); // Uncaught ReferenceError: y is not defined
```

### 2) const, let
``` js
const a = 0;
a = 1; // Uncaught TypeError: Assignment to constant variable

let b = 0;
b = 1; // 1
const c; // Uncaught SyntaxError: Missing initializer in const declaration
```
#### 🔒 const는 상수
: 앵간하면 const로 선언하고 값 바꿀 일이 생기면 let으로 바꾸는것 추천
- 상수에 할당한 값은 다른 값으로 변경 불가
- 변경하고자 할 때는 let으로 변수 선언

### 3) 템플릿 문자열
: 전체를 백틱(`)으로 감싸고 변수를 ```${}```로 감싸준다.
``` js
const won = 1000;
const result = `이 과자는 ${won}원 입니다.`;

// 번거로운 예전 버전
var result = '이 과자는 ' + won + '원 입니다.'
```

- tagged template literal\
: ES2015 이후로 함수 호출 시 사용가능.
``` js
function a() {
    console.log("ㅋㅋ루삥뽕");
}

a();
a``;
```

### 4) 객체 리터널
#### 🔒 ES5 시절의 객체 표현 방법
: 속성 표현 방식 주목
``` js
var sayNode = function() {
    console.log("Node");
};

var es = "ES";
var oldObject = {
    sayJS: function {
        console.log("JS");
    },
    sayNode: sayNode,
};
oldObject[es + 6] = 'Fantastic'; // es는 동적 속성
oldObject.sayNode(); // Node
oldObject.sayJS(); // JS
console.log(oldObject.ES6); // Fantastic
```
#### 🔒 지금은 훨씬 간결한 문법으로 객체 리터럴 표현 가능
- 객체의 메서드에 function을 붙이지 않아도 된다.
- ```{ sayNode: sayNode }```처럼 키와 변수가 같은 것을 { sayNode }로 축약 가능.
- [변수 + 값] 등으로 동적 속성명을 객체 속성 명으로 사용 가능.
``` js
const newObject = {
    sayJs() {
        console.log("JS");
    },
    sayNode,
    [es + 6]: 'Fantastic', // es는 동적 속성
};
newObject.sayNode(); // Node
newObject.sayJs(); // JS
console.log(newObject.ES6); // Fantastic
```

### 5) 화살표 함수
``` js
function add1(x, y) {
    return x + y;
}

const add2 = (x, y) => {
    return x + y; // add1을 화살표 함수로 나타낼 수 있다.
};

const add3 = (x, y) => x + y; // 함수 본문이 return만 있는 경우 return 생략
const add4 = (x, y) => (x + y); // 헷갈릴 수 있으니까 소괄호로 묶어주기

function not1(x) {
    return !x;
}

const no2 = x => !x; // 매개변수 1개 일 때 괄호 생략

const obj = (x, y) => ({ x, y });
// 객체 {x:x, y:y}일 경우 {x, y}로 바꿀 수 있고
// 이것이 객체라는 걸 화살표 함수가 구별을 못할 수 있으니 ()로 묶어주기
```
#### 🔥 화살표 함수가 기존 function() {}을 대체하는 것은 아님 🔥
: this가 달라진다.
- 기존 function
    - logFriends 메서드의 this 값 주목
    - forEach의 function의 this와 logFriends의 this는 다름
    - that이라는 중간 변수를 이용해서 logFriends의 this를 전달
``` js
var relationship1 {
    name: 'zero',
    friends: ['nero', 'hero', 'xero'],
    logFriends: function() {
        var that = this; // relationship1을 가리키는 this를 that에 저장
        this.friends.forEach(function(friend) {
            console.log(that.name, frined);
        });
    },
};
relationship1.logFriends();
```
- 화살표 함수
    - forEach의 인자로 화살표 함수가 들어간 것에 주목
    - 화살표 함수는 자신을 포함하는 함수의 this를 물려받음
    - 물려받고 싶지 않을 때는 function() {}를 사용함
``` js
const relationship2 = {
    name: 'zero',
    friends: ['nero', 'hero', 'xero'],
    logFriends() {
        this.friends.forEach(friend => { // 이 this랑
            console.log(this.name, friend); // 이 this랑 같은 this임.
            // 부모의 this = 나의 this
        });
    },
};
relationship2.logFriends();
```
- ⚡️ 예시
``` js
// 클릭할 때 마다 button안의 text가 console에 출력
button.addEventListener('click', function() {
    console.log(this.textContent);
})

// 동작X. 여기서 this는 바깥의 this기 때문에
button.addEventListener('click', () => {
    console.log(this.textContent);
})

// 고치면?
button.addEventListener('click', (e) => {
    console.log(e.target.textContent);
})
```
: this를 사용할거면 function을 사용하고, 굳이 사용하지 않아도 된다면 화살표 함수 사용 권장.
__🔥 화살표 함수와 function은 꼭 잘 구별하기(this)!! 중요하다!! 🔥__

### 6) 구조 분해 할당(비구조화 할당)
: 자바스크립트에서 객체안의 속성이 변수명 자체가 되는 경우가 많다.\
: 하지만 이런식으로 계속 꺼내서 사용하면 코드가 지저분해진다.
#### 🔒 객체에서
: 키와 변수명이 같아야한다. (바꿀 순 있음)
- 사용방법
``` js
const { 변수 } = 객체;
```
> 속성안의 속성도 변수명으로 사용 가능
- ⚡️ 예시
``` js
// 코드가 지저분해지고, example은 사용하지 않아도 계속 언급되어야한다.
const example = { a: 123, b: { c: 135 d: 146 } }
// 이런식으로 하나하나 꺼내서 사용해야한다.
const a = example.a;
const d = example.b.d;
```
``` js
// 구조 분해 문법 사용하면?
const { a, b: { d } } = example;
console.log(a); // 123
console.log(d); // 146
```
#### 🔒 배열에서
: 자리가 같아야한다.\
: ```,```만 있으면 뛰어넘는 것.
``` js
const arr = [1, 2, 3, 4, 5];
const x = arr[0];
const y = arr[1];
const z = arr[4];
```
``` js
// 구조 분해 문법 사용하면?
const [x, y, , , z] = arr;
```
#### 🔒 구조 분해 할당 안하는게 좋은 경우
: this를 사용했을 경우 구조 분해 할당 안하는게 좋다!\
=> __this는 함수를 호출할 때 어떻게 호출되었냐에 따라 결정되기 때문__
``` js
// 예전 문법
var candyMachine = {
    status: {
        name: 'node',
        count: 5,
    },
    getCandy: function() {
        this.status.count--;
        return this.status.count;
    },
};
var getCandy = candyMachine.getCandy;
var count = candyMachine.status.count;
```
``` js
// 최신 문법
const candyMachine = {
    status: {
        name: 'node',
        count: 5,
    },
    getCandy() {
        this.status.count--;
        return this.status.count;
    },
};
const { getCandy, status: { count } } = candyMachine;
```
### 7) 클래스
: 프로토타입 문법을 깔끔하게 작성할 수 있는 Class 문법 도입
- Constructor(생성자), Extends(상속) 등을 깔끔하게 처리할 수 있다.
- 코드가 그룹화되어 가독성이 향상된다.
#### 🔒 예전 문법
: 생성자 함수, static method, 인스턴스 method 들이 다 따로따로 선언.
``` js
// 생성자 함수
var Human = function(type) {
    this.type = type || 'human';
};

// static method (생성자 method)
Human.isHuman = function(human) {
    return human instanceof Human; 
}
// 인스턴스 method(프로토 타입 method)
Human.prototype.breathe = function() {
    alert('h-a-a-a-m');
};

// Human을 상속받는다. . .
var Zero = function(type, firstName, lastName) {
    Human.apply(this, arguments);
    this.firstName = firstName;
    this.lastName = lastName;
}
Zero.prototype = Object.create(Human.prototype);
Zero.prototype.contructor = Zero; // 상속하는 부분

Zero.prototype.sayName = function() {
    alert(this.firstName + ' ' + this.lastName);
};
var oldZero = new Zero('human', 'Zero', 'Cho');
Human.isHuman(oldZero); // true
```
#### 🔒 클래스를 사용하면
``` js
class Human {
    constructor(type = 'human') {
        this.type = type;
    } // 생성자

    static isHuman(human) {
        return human instanceof Human;
    } // static method

    breathe() {
        alert('h-a-a-a-m');
    } // instance method
}

// 상속 받기
class Zero extends Human {
    constructor(type, firstName, lastName) {
        super(type); // 부모의 함수를 부를 수 있음.
        this.firstName = firstName;
        this.lastName = lastName;
    }
    
    sayName() {
        super.breathe(); // 부모의 함수를 부를 수 있음.
        alert(`${this.firstName} ${this.lastName}`);
    }
}

const newZero = new
```
## 🔨 3. 프런트엔드 자바스크립트