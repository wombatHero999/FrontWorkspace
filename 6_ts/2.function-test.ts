// 1. (a:number,b:number) => number
const apply: (a:number,b:number) => number = (a,b) => a+b;

// 2
type PrintType = (name:string, favorite: "돈까스"|"제육"|"치킨") => void;
const print:PrintType = (name, favorite) => {
    console.log(`안녕하세요 . 제 이름은 ${name}입니다. 제 최애 음식은 ${favorite}입니다,
    하나만 사주세요`);
}

// 3
let data:string; 
data = racoonInfo('podong' , 10, 'male', true );
console.log(data);//이름 : podong , 무게 : 10 , 성별 : male, 중성화 : true
data = racoonInfo('coco',4, 'female' );
console.log(data);//이름 : coco , 무게 : 4 , 성별 : female

function racoonInfo(name:string, weight:number, gender:string, 중성화?:boolean) {
    return `이름 : ${name} , 무게 : ${weight} , 성별 : ${gender}${중성화 != undefined ? `, 중성화 ${중성화}` :'' }`
}

// 4
const array2:(string|number|number[])[] = ['1',2,3,4,'5',[1,2,3,4,5]];
function sum(array2: (string|number|number[])[]) : number{
    let sum = 0;
    for(let num of array2){
        if(typeof num === 'number') sum+= num;
        else if (typeof num === 'string') sum += Number(num);
        else if (Array.isArray(num)){
            for(let n of num){
                sum += n;
            }
        }else{
            throw new Error(`잘못된 값입니다 : ${num}`)
        }
    }
    return sum;
}
const total = sum(array2);
console.log(total); // 30

// 5
function abc(praam: (number|string|string[]|number[])  ) : number|number[]{
    if(typeof praam === 'string'){
        return Number(praam);
    }else if(typeof praam === 'number'){
        return praam;
    }else if(Array.isArray(praam)){
        let numberArr:number[] = [];
        for(let num of praam){
            if(typeof num === 'string'){
                numberArr.push(Number(num));
            }else{
                numberArr.push(num);
            }
        }
        return numberArr;
    }else{
        throw new Error("잘못된 값입니다 "+ praam);
    }
}
// 6
function multiplyAll(first : number ,...rest:number[]): number {
    let total = first;
    for(let num of rest){
        total *= num
    }
    return total;
}
console.log(multiplyAll(2)); // 2
console.log(multiplyAll(2, 2)); // 4
console.log(multiplyAll(2, 2, 2)); // 8
console.log(multiplyAll(2, 2, 2, 2)); // 16
console.log(multiplyAll(2, 2, 2, 2, 2)); // 32
//...
// 7
type Types = string | number | boolean;
function handleValue(value:Types) {
    if(typeof value === 'string') console.log('문자열');
    else if(typeof value === 'number') console.log('정수');
    else if(typeof value === 'boolean') console.log('불린');
    else assertNever(value);
}

function assertNever(value : never){
    throw new Error("에러입니다.")
}
// 8
type FnType = ([first,...rest]:[number, ...number[]]) => number[]
const fn:FnType  = ([first, ...rest]) => {
    return rest.map( i => i+first);
}
//fn([]) // 컴파일에러
fn([1]); // []
fn([1,2]); // [3]
fn([1,2,3]); // [3,4]
fn([1,2,3,4]); // [3,4,5]

export default fn;