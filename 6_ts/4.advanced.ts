/* 
    1. class
     - javascript의 class문법을 보다 확장하여 좀 더 객체지향
     적인 프로그래밍이 가능하도록 만들었다.
     - 접근제한자, 추상클래스, 인터페이스구현 등의 기능을 제공
*/
abstract class Animal{
    abstract bark(): void;
}
class Tiger extends Animal{
    // 필드
    public name :string;
    protected age:number;
    private location:string;

    constructor(name:string, age:number, location:string){
        super();
        this.name = name;
        this.age = age;
        this.location = location;
    }

    bark(): void{
        console.log('어흥');
    }
}
const tiger = new Tiger('mkm',25,'서울');
tiger.bark();

/* 
    2. 생성자 파라미터 문법
     - class생성시 반복되는 코드를 줄여주는 단축구문
*/
class Product {
    // 필드선언 생략
    // 초기화 코드 생략
    constructor(public id:number
        , protected name :string
        , private price :number
        , readonly brand:string){
    }
    printInfo(){
        console.log(this.id);
        console.log(this.name);
        console.log(this.price);
        console.log(this.brand);
    }
}
new Product(1, '로봇청소기',700000,'삼성').printInfo();

/* 
    3. Generics
     - Type을 변수처럼 외부에서 주입받아 사용하는 긴으으로
     타입변수라고 불린다.
     - Type에 유연성을 제공하면서 확장성과 타입안전성을
     추가할 수 있다.
     - extends를 통한 상한경계 설정이 가능.(super는 미지원)
*/
// 1) 제네릭 타입추론
function returnGeneric<T>(value:T):T{
    return value;
}
const result = returnGeneric("hello");

// 2) 제네릭의 extends
//  - 제네릭에 상한타입을 설정
//  - super(하한경계)는 지원하지 않는다.
// Animal을 상속받았거나 하위타입만 받는 함수를 작성
function func<T extends Animal>(animal :T){
    animal.bark();
}
function func2<T extends {bark():void}>(animal:T){
    animal.bark();
}
func2(tiger);

/* 
    3) 제네릭의 기본타입
     - 제네릭이 사용되지 않는 경우, 타입변수에 대입될 기본값설정
*/
function defValue<T = string>(value?:T):T[]{
    return value ? [value] : [];
}
const arr1 = defValue("hi");// 타입추론
const arr2 = defValue(45); // 타입추론에 의해 number[]
const arr3 = defValue(); // 기본값사용.

/*
    기본타입 + extends
*/
type Options = {theme:string};
function config<T extends Options = {theme:'dark'}>(options?:T):T{
    // return options ? options : {theme:"dark"} as T;
    //return options || {theme:"dark"} as T;

    // 널병합연산자 ??
    //  - a ?? b -> a가 null또는 undefined가 아니라면 A,
    //   맞다면 B반환
    return options ?? {theme:"dark"} as T;
}

/* 
    4) keyof연산자와 generic
     - 객체타입의 속성명들을 UnionType으로 추출하는 연산자
*/
type Person2 = {
    name : string,
    age : number,
    location : string
};
type KeyOfPerson = keyof Person2;// "name" | "age" | "location"

function getValue<
P extends Person2 
, K extends KeyOfPerson>(person:P, key:K):P[K]{
    return person[key];
}
/* 
    4. Utility Type
     - 기존 객체타입들을 변형 및 조작할 수 있도록 도와주는
     유틸리티 타입들

     1) Partial<T>
      - T의 모든 속성을 optional속성으로 변경해주는 유틸리티 타입
      - 모든 속성을 필수, 읽기전용으로 만들어 주는 Required<T>,
        Readonly<T>도 존재한다.
*/
interface User {
    id:number;
    name:string;
    email:string;
}
interface UpdateUser{
    id:number;
    name:string;
    email?:string;
}
const user:UpdateUser = {id:1,name:'aaa'};
const PartialUser:Partial<User> = {id:1,name:'aaa'};

/* 
    2) Pick<T,K>
     - 객체의 속성 중 일부만 선택하여 새로운 타입을 만들때 사용
*/
type SimpleUser = Pick<User, "name" | "email">;
// {name:string, email:string}

/* 
    3) Omit<T,K>
     - 객체타입에서 특정 속성을 제외한 나머지만 남긴 새
     타입을 만들 때 사용
*/
type NewUser = Omit<User,"id">;
const userData:NewUser = {name:"mkm",email:"zz"};
/*
    Utility Type 조합
    1. User에서 id를 제외한 나머지 속성을 선택한 후 전체를
    선택속성으로 만들기.
    2. User의 속성 중 name속성을 필수로 만들기
    3. 1,2번을 머지
    {name:string} &
    {name?:string,email?:string}
    - 같은속성이 병합되는 경우, 좀더 구체적인 속성으로 병합
*/
type EditableUser = Partial<Omit<User,"id">> & Required<Pick<User,"name">>

/*
    4) Record<K,T>
     - 키 집합을 기준으로 T타입을 지정하는 객체타입을 만든다.
     - 지정된 키값들로 구성된 객체를 만들고 싶을때 사용.
*/
type Page = "home" | "about" | "concat";
type PageInfo = {
    title : string,
    path : string
}
type PageInfo2 = {
    "title": PageInfo,
    "concat" : PageInfo,
    "home" : PageInfo 
}

const pageMap:Record<Page,PageInfo> = {
    home:{
        title:"홈페이지",
        path : "/"
    },
    "about" : {
        title : "어바웃페이지",
        path : '/about'
    },
    concat : {
        title : '연락처',
        path : "/concat"
    }
}

/*
    5) ReturnType<T>
     - 함수타입 T가 반환하는 결과의 타입을 그대로 가져오는 타입
*/
function getUser(){
    return {id:1,name:'mkm',email:"aaa"};
}
type UserData = ReturnType<typeof getUser>;

/*
    6) Parameters<T>
     - 함수타입 T의 매개변수 타입을 배열로 추출
     - 함수의 동일한 시그니처 유지를 위해 사용한다.
*/
function greet(name:string, age:number){

}
type GreetParams = Parameters<typeof greet>; // [name,age]
const callGreet = function(...args:GreetParams){
    greet(...args);
}
export default Animal;
