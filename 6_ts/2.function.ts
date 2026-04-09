/* 
    1. 함수타입
     - 함수의 매개변수와 반환값에 타입을 저장할 수 있다.
     - 저장된 타입과 다른값이 전달되거나, 반환되면 컴파일 에러발생
*/
function greet(name:string){
    console.log("안녕하세요 " +name);
}
function returnNumber() : number {
    return 1;
}
greet('mkm');
let a = returnNumber();

/*
    2. void
     - 함수가 값을 반환하지 않을 때 사용되는 타입
     - 반환값이 없는 함수의 기본 반환타입으로 사용됨
     - 계층구조상 undefined의 super타입
*/
function fnVoid(x:number) :void{
    // return x;
    //return ;
    return undefined;
}
/* 
    3. Optional Paramter
     - 선택적인 속성을 표현할 때 사용하는 속성.
     - 변수명?:type
     - 옵셔녈파라미터는 type | undefined 유니언 타입으로설정
*/
function fnOptional(a:number , b?:number) : number{
    if(b != undefined){
        return a * b;
    }
    return 0;
}
//fnOptional();
fnOptional(1);
fnOptional(1,2);

/* 
    4. restParameter
     - 함수의 매개변수에 들어갈 인자의 수가 정해지지 않은
     경우 사용하는 es6문법
     - 매개변수로 전달되는 값들을 하나의 배열로 관리
*/
function restParameter(...m:number[]){

}
restParameter(); // []
restParameter(1); // [1]
restParameter(1,2,3,4); // [1,2,3,4]

/* 
    5. spread 연산자
     - 배열이나 객체의 값을 전개하여 깊은복사나, 함수의
     매개인자로 전달하는 문법.
*/
const spreadArr = [1,2];
restParameter(...spreadArr);

function normalFn(a:number, b:number){
    console.log(a, b);
}
/* 
    배열은 크기가 정해지지 않은 타입이기 때문에, 매개변수의
    갯수가 고정된 일반함수에서 전개연산자를 통해 인자를 전달할
    수 없다.
     -> 자릿수가 정해진 튜플로 해결 가능.
*/
//normalFn(...spreadArr);
const arr2 = [1,2] as const;
normalFn(...arr2);

/* 
    6. 비구조화문법
     - 배열이나 객체의 구조를 분해하여 개별 변수로 할당하는 문법
*/
function objectDesFn({a , b, c} : {
    a:number,
    b:string,
    c:boolean
}){

}
objectDesFn({a:1 , b:'mkm',c:true})

function arrayDesFn([first, second,third]:[number, string, boolean]){

}

// rest + des
function arrayDesFn2([first,...rest]:[number, ...(string|boolean)[] ]){

}
arrayDesFn2([1,'mkm',true]);

function objectDesFn2({
    a , ...rest
} : {
    a : number ,
    // b : string ,
    // c : boolean
    [key:string] : string | boolean | number
}){

}
objectDesFn2({a:111,b:'mkm',c:false});

/*
    7. 타입 좁히기(Type narrowing)
     - unionType이나 unknown처럼 변수가 여러타입을 가지고
     있을 때, 이를 사용하는 시점에서 특정 한가지로 좁히는 문법
     - typeof, instanceof , in 조건식 등등..
*/
function typeNarrowing(strOrNum: string|number) :void{
    if(typeof strOrNum === "string")
        console.log(strOrNum.toUpperCase());
    else
        console.log(strOrNum.toFixed(2));
}
typeNarrowing(1000);
typeNarrowing("mkm");

/* 
    8. Type Assertion
     - 여러타입을 가질 수 있는 변수에 대하여 "개발자가 직접" 해당
     값의 타입을 명확히 지정하는 문법.
     - 타입단언시 컴파일러가 이를 믿고 타입 체크를 생략
     - 타입단언은 개발자가 실제타입을 완벽하게 알고 있을때만 사용한다.
*/
function typeAssertion(strOrNum:string|number):string{
    return strOrNum as string;
}
typeAssertion(100);

// not null 단언문
// - 선택한 변수의 값이 null(undefined포함)이 
//   아님을 단언하는 문법
function notNullAssertion(number?:number) :number{
    return number!;
}
/* 
    9. never type
     - 어떤 값도 가질수 없는 타입을 의미하며, 절대 값을
     반환할 수 없는 함수나, 도달할 수 없는 코드블럭을 표현할때
     사용
     - never는 예외적인 상황을 명확히 표현하여 버그를 방지하기
     위해사용한다.
*/
function fnNever():never{
    throw new Error();
    //return;
}
function fnNever2():never{
    while(true){

    }
    //return ;
}
type etc = string | number;
function typeNarrowing2(sOrn:etc):void{
    if(typeof sOrn === 'number'){
        console.log(sOrn);
    } else if(typeof sOrn === 'string'){
        console.log(sOrn);
    }else{
        console.log(sOrn);
        UnexpectedValue(sOrn);
    }
}
function UnexpectedValue(value:never):never{
    throw new Error(`허용하지 않는 자료형입니다 : ${value}`);
}
const any:any = ['11'];
typeNarrowing2(any);

/*
    10. 함수 타입 표현식 / 함수 시그니처
     - 함수 시그니처?
         - 함수가 가지는 매개변수의 개수와 자료형, 반환형을 의미
     - 함수의 시그니처를 타입으로 정의하는 방법 => 함수타입표현식
*/
// 일반함수
function print(s :string) : void{
    console.log(s)
}
//함수표현식
const print2 = (s:string) : void => {
    console.log(s)
}
// 콜백함수를 매개변수로 갖는 함수 표현식
const hello = (callback : (s:string) => void ) :void => {
    callback("zzzz");
}
hello((s)=> console.log(s));
/*
    11. 타입별칭(Type Aliases)
     - 복잡한 타입을 별칭으로 지정하여 관리하기 위한 문법
     - 타입의 가독성과 재사용성을 크게 늘려준다.
     - 대문자로 시작하는 것이 관례
*/
type PrintFn = (s : string) => void;
type HelloFn = (callback : PrintFn) => void;

const hello2:HelloFn = (callback) => callback("hello");
hello2(print2);

export default print;