/*
    1. 객체 타입 별칭
*/
type Person = {
    name : string ,
    age : number,
    gender? : string
};
const person1:Person = {name:'mkm',age:18};
const person2:Person = {name:'mkm',age:18, gender:'male'};

/* 
    2. interface
     - 객체의 구조를 정의하는 또 다른 방법
     - 인터페이스와 타입별칭의 동작방식은 유사하나
      각기 존재하는 기능이 다름.
*/
interface Animal {
    name : string
    kind : string
    birth?:  Date
}
type AnimalAliases = {
    name : string
    kind : string
    birth?:  Date
}
const cat = {name:'coco',kind:'cat',birth:new Date()};
const animal1:Animal = cat;
const animal2:AnimalAliases = cat;

/*
    3. interface와 타입별칭의 차이점
     - 두 문법의 최종적인 동작방식은 비슷하나, 확장성에서
     차이가 있다.
     - 확장성 : 객체의 구조를 변경하는 방법
*/
// 1) interface A extends B
//  - A인터페이스에 B인터페이스의 속성을 확장
interface Cat extends Animal {
    food:string;
}
const cat2:Cat = {food:'츄루', name:'coco', kind:'cat'};

// 2) interface의 선언형 머지
interface Bird {
    name : string;
}
interface Bird {
    wing : number;
}
const bird:Bird = {wing:4, name:'앵무새'};

interface Bird{
    name : string;
    // - 선언병합시 기존 인터페이스가 가지고 있는 속성의 타입을
    //   반드시 일치시켜줘야한다.
    //wing : boolean;
}

// 3) object intersection / union
//  - 집합연산자를 활용한 병합
type Ingredient = {name:string}
type Taste = {flavor:string}
type Food = Ingredient | Taste;
// {name:string , flavor:string} |
// {name:string} | {flavor:string}

// a & b
const pizza:Food = {name:'파파존스',flavor:"짠맛"};
// a
const bugger:Food = {name:'맥도날드'};
// b
const flavor:Food = {flavor:"짠맛"};

type _Food = Ingredient & Taste;
// {name:string , flavor:string}

//type Sample = string & number;
type Dog = Animal & {food : string};
/*
    4. 결론
     - 대부분의 상황에서 어떤 타입을 쓰든 큰 차이점은 없다
     - 단, 타입작성 목적 및 내부 구조의 구현방식에 따라 적합한
     설계 방식이 나뉘게 된다.

    1) interface가 적합한 경우
     - 클래스와 함께 사용시, 구조 확장과 유지보수가 필요한 경우
     - 디버깅시 타입표시가 필요한 경우
     - type별칭을 쓰든 interface를 쓰든 상관 없는 경우.

    2) type별칭이 적합한 경우
     - 유니언, 교차타입 및 복합타입정의가 필요한 경우.
     - 튜플, 기본타입, 함수타입에 별칭을 정의하는 경우
     - 조건부타입, 제네릭으로 지정하고 싶은 경우
*/
type SuccessResponse = {
    status : boolean;
    data : any;
};
type FailResponse = {
    status : boolean,
    errorMessage : string
}
export type Response = SuccessResponse | FailResponse;
type str = string;
type bool = boolean;
/*
    5. 인덱스 시그니쳐
     - 객체의 속성명에 대하여 명확히 인지하지 못하는 경우
     사용하는 문법
     - 객체의 속성명과 그 타입을 "일반화" 하여 표현한다.
       const responseData = {
//     "user01" : {
//         name : 'kh 호랑이',
//         age  : 50,
//         interest : ['낮잠']
//     } , 
//     "user02" : {
//         name : 'kh 수달',
//         age  : 5,
//         interest : ['잠수'],
//     }}
*/
type User = {
    name : string;
    age : number;
    interest : string[];
}

type UserList = {
    [id:string] : User;
}

const responseData:UserList = {
    "mkm" : {
        name:'kh호랑이',
        age : 50,
        interest :['낮잠']
    },
    "mkm2" : { 
        name:'kh호랑이',
        age : 50,
        interest :['낮잠']
    }
}
// 인덱스 시그니쳐 사용시 주의점
const responseData2:ClassInfo = {
    name : 'kh academy' , 
    classRoom : 'C CLASS',
    teacher : 'mkm',
    student1 : 'jsy',
    student2 : 'jsy',
    student3 : 'kkk',
    student4 : 'tes',    
    studentCount : 30    
}
//- 속성에 여러값들이 들어가는 경우, 인덱스 시그니쳐는
// 그 모든값들에 대해 표현할 수 있어야 한다.
type ClassInfo = {
    name : string,
    classRoom : string,
    teacher : string,
    studentCount : number,
    [student:string] : string | number,
}

/*
    6. 타입호환성
     - 타입스크립트에서 두 타입이 서로 대입 가능한지를 판단
     하는 개념
     - 타입검사 매커니즘상 호환되지 않는 경우 컴파일 에러를
     발생시킨다.
*/
type Teacher = {
    name : string,
    age : number
};
type Student = {
    name : string,
    age : number
};
const mkm:Teacher = {name:'mkm',age:11};
const mkm2:Student = mkm; // 구조가 똑같기 때문에 호환가능

// 객체 리터럴 대입시, 타입검사 실행.
//  - 잉여속성 검사 
//const kim:Student = {name:'kim',age:4, location:'seoul'};
const kim = {name:'kim',age:4, location:'seoul'};
const park:Student = kim;

export default animal1;



