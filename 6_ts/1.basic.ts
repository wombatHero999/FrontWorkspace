/*
    1. 타입주석
     - 타입스크립트에서는 변수 선언시 "타입"을 명시할 수 있다.
     - 타입주석을 통해 정적 타입 검사가 가능해지며, 잘못된 
     타입의 값이 들어갈 경우 컴파일 에러를 발생시킨다.
*/
let num :number;
num = 12345;
//num = '12345';
num * Number('1'); // 타입스크립트에서는 자동형변환기능 제공x

// 배열 타입주석
// type[] 
let animals:string[];
animals = ["hamster"];

// 객체 타입주석
// {key:type}
let animal:{name:string};
animal = {name:'coco'};

/*
    2. 타입추론
     - 변수에 대입하는 값을 바탕으로 타입을 자동으로 추론하는 기능
     - 간단한 변수 선언시에는 타입주석을 작성하지 않고 타입추론
     을 활용하는 것이 좋다.
     - 단, 복잡한 함수의 매개변수나 반환형, api명세등 명확한
     타입정의가 필요한 곳에는 반드시 작성한다.
*/
let userName = "KH 정보교육원";
let age = 5;

/*
    3. 배열과 튜플
    배열의 특징
     - 배열의 크기에 대한 제약이 존재하지 않으며, 들어가는 타입
     에 대한 제한도 없다.
     - 잘못된 인덱스에 접근시 에러가 발생하지 않는다.
*/
let numArr:number[];
numArr = [1,2,3];
console.log(numArr[2], numArr[3]);
numArr = [1,2,3,4,5];

/* 
    튜플
     - 튜플은 배열의 특수한 형태로 "길이"와 "타입"이 고정된 배열
     - 일반배열은 언제든 요소의 수가 변할 수 있지만, 튜플은
     항상 고정된 구조를 가짐.
*/
let numTuple:[number, number, number];
numTuple = [1,2,3];
//console.log(numTuple[3]); // 잘못된 인덱스 접근시 컴파일에러

/* 
    4. readonly
     - 튜플은 배열이 가질 수 있는 값의 수와 타입을 정의한다.
     - 단, 튜플은 js에는 존재하지 않는 타입으로 컴파일 완료
     후에는 배열로 변환된다.
     - 타입스크립트의 정적타입체크 시스템은 실제 코드를 실행하
     기 전 단계에서 작동하므로 실행환경에서 동작하는 메서드에
     대한 검사는 수행하지 않는다.
*/
numTuple.push(1111);

// 수정불가튜플
let readonlyTuple:readonly[number,string,boolean];
readonlyTuple = [11,'kh',true];

// readonlyTuple.push(11); 배열의 값을 추가,제거하는 메서드를 없앰

// 객체의 속성에 수정불가옵션 추가
let readonlyObj:{readonly name :string};
readonlyObj = {name:'kh'};
//readonlyObj.name = "mkm";

/* 
    5. any Type
     - 어떤 값이든 저장할 수 있는 타입
     - 타입스크립트의 정적타입검사를 우회하기 위해 설계되었다.
     - javascript코드와의 호환성 유지 및 마이그레이션을 돕기
     위한 타입이고, 무분별하게 사용시 typescript의 사용의미
     가 사라진다.
*/
let any:any;
any = undefined;
any = 1;
any = '111';

let str:string;
str = any;

let num2:number;
num2 = any; // any타입은 어떠한 타입으로든 할당 가능.

/* 
    6. unknown type
     - 어떤 값이든 할당할 수 있는 타입.
     - any타입과 다르게 타입검사기능은 제대로 동작한다.
     - 즉, 타입안정성 유지가 가능하다.
*/
let unknown:unknown;
unknown = 1;
unknown = "mkm";

// unknown타입의 값은 어떤 타입에도 재할당이 불가능.
//  - 단순히 값을 받기위한 용도로만 사용하며, unknown에 할당된
// 데이터를 사용하기 위해서는 적절한 타입으로의 narrowing필요
//str = unknown;
//num2 = unknown;

/*
    7. union type
     - 여러 타입들을 묶어서 관리하는 타입
     - type1 | type2 | type3
*/
let strOrNum: string | number;
strOrNum = 'Union';
strOrNum = 11111;
//strOrNum = true;

/*
    8. 리터럴타입
    - 값 자체를 타입으로 사용하는 타입
    - 여러 리터럴 값들을 묶어서 리터럴 유니온으로 많이 사용된다.
*/
const PI = 3.14;
let constNum:1234;
constNum = 1234;

let method:'card'|'bank';
method = 'card';
method = 'bank';
//method = 'point';

// as const
//  - 객체나 배열에 저장된 값을 "리터럴 타입"으로 변환시켜
//    타입 안전성을 확보할 수 있게 도와주는 기능.
let payInfo = {name:'kh 풍뎅이',price : 15000, method:'bank'} as const;
method = payInfo.method;

let arr3 = [1,2,3,4] as const;

export default num;