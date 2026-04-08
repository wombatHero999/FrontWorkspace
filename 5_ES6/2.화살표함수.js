/*
    1. 화살표 함수
     - 함수를 간결하게 표기하는 방법
     - function키워드 없이 (매개변수) => 본문 형태로 작성하는 함수
     - 일반함수와 this바인딩이 다르다.
*/
function declareFn(a,b){
    return a* b;
}
const declareFn1 = (a,b) => {return a*b};
const declareFn2 = (a,b) => a*b;
const decalreFn3 = a => a;

// 2. this바인딩
//  - this는 모든함수에 묵시적으로 존재하는 예약어
//  - 함수를 호출한 객체의 "주소값"이 바인딩 되도록 설계되어 있다.

function callableFn(){
    console.log(this);
}
callableFn(); // global(전역)

const obj1 = {
    name : "객체 1",
    callableFn : callableFn
}
obj1.callableFn(); // this?? obj1

/* 
    3. 화살표 함수의 this
     - 화살표함수는 자신만의 this를 가질 수 없도록 설계되어 있다.
     - 화살표함수는 선언된 위치의 상위 스코프의 this를 그대로 참조하여 사용
*/
const arrowFn = () => {
    console.log(this); // global.this
}

const obj2 = {
    name : '객체2',
    arrowFn : arrowFn
}
obj2.arrowFn();

// break
const obj3 = {
    name : '객체3',
    arrowFn : function(){
        // 1? obj3.name
        console.log(this.name); // 객체3

        const getName = () => {
            return this.name;
        }
        console.log(getName()); // 2? arrowFn의 this를 공유하므로 객체3

        const getName2 = function(){
            return this.name;
        }        
        console.log(getName2());// 3? 글로벌의 this.name
    }
};
obj3.arrowFn();

/* 
    4. 일반함수 vs 화살표 함수
    1) 화살표 함수를 사용하는게 적합한 경우
     - this가 필요 없는 함수를 간결하게 표현하고자 할때
     - 상위스코프의 this를 그대로 유지해야 하는 콜백함수 사용시
*/
function Timer(){
    this.seconds = 0; // {seconds : 0}

    setInterval(() => {
        this.seconds++;
        console.log(this.seconds)
    }, 1000)

}
new Timer();

/* 
    2) 일반함수를 사용하는게 적합한 경우
     - this가 동적으로 바인딩 되어야 하는 경우
        - 객체의 메서드나 생성자 함수인 경우.
     - this값을 현재 호출한 주체로부터 가져와야 하는 경우
*/
const counter = {
    count :10 ,
    increase : function(){
        this.count++;
        console.log(this.count);
    }
};
counter.increase();

// 5. 일반함수의 정적 this 바인딩
const user = {
    name : 'mkm',
    printName : function(){
        console.log("my name is "+this.name);
    }
};
user.printName();

// 1) call(thisargs, ...args)
// - 함수의 this를 첫번째 인자로 전달된 값으로 변경한 후 호출
user.printName.call({name:'Donald Trump'});

// 2) apply(thisargs , [args])
// - call과 동일하지만 두번째 인자를 배열로 받는다.
function printName(greeting, target){
    console.log(`${greeting}, ${this.name} and ${target}`);
}
printName.apply({name:'mkm'} , ['hello' , 'Mr. Min']);

// 3) bind(thisArgs)
//  - 함수를 실행하지 않고 this가 바인딩된 새로운 함수를 반환
//  - 함수의 this값을 미리 바인딩 해둬야 하는 경우 사용한다.
const bindFn = user.printName.bind({name:'춘식'});
bindFn();

