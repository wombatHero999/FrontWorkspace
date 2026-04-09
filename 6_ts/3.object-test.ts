// 1
type Academy = {
    readonly name : 'kh',
    class : string[],
    location? : string ,
    employee : Employee
};
type Employee = {
    name : string ,
    position : string ,
    dept_code? : string 
};

// 2
type MBTIType1 = 
{   mbti : string,
    feature:string[],
    vocation?:string };
const type1:MBTIType1  = {mbti : 'ISTP', feature : ['망상가', '공감능력 부족'], vocation : '데이터분석가'};
const type2:MBTIType1  = {mbti : 'INTJ', feature : ['완벽주의자', '무신경']};

type MBTIType2 = {
    mbti:string , 
    bestGunghab : string[],
    worstGunghab? : string
};
const type3:MBTIType2  = {mbti : 'ISTP' , bestGunghab : ['ESFJ', 'ESTJ'] };
const type4:MBTIType2  = {mbti : 'ESFJ' , bestGunghab : ['ISFP', 'ISTP'] , worstGunghab : 'ENFJ' };

type MBTIType3 = MBTIType1 & MBTIType2;
const type5:MBTIType3 = {mbti : 'ISTP' , bestGunghab : ['ESFJ', 'ESTJ'], feature : ['망상가', '공감능력 부족']  }; 
// type6는 컴파일 에러 발생
// const type6:MBTIType3 = {mbti : 'ISTP' , bestGunghab : ['ESFJ', 'ESTJ'] , worstGunghab : 'ENFJ'}; 

// 3
interface Person {
    name : string,
    married?:boolean
}
interface Teacher extends Person {
    major : string,
    classRoom : string, 
    carrer : number
}
interface Singer extends Person{
    songs : string[],
    group : string
}

const mkm:Teacher  = {name : 'mkm', married : false
    , major: 'it', classRoom : 'C' , carrer:10 };
const karina:Singer = {name : '카리나', married : false, songs: ['슈퍼노바','블랙맘바'] , group : '에스파'  };
const winter:Singer = {name : '윈터', songs: ['슈퍼노바','블랙맘바'] , group : '에스파'  };

// 4
type PrintFn = (callback:CallFn) => void;
type CallFn = (something: string) => void;
type ObjType = {
    name : 'mkm',
    printName : PrintFn,
    call : () => void
};

const obj:ObjType = {
    name : 'mkm', 
    printName: function(callback) {        
        callback(this.name);
    },
    call : function() {
        const callback = (something:string) : void => {console.log(something)}
        this.printName(callback);
    } 
};
obj.call(); // mkm

// 5
type Coin = {
    market : string,
    ticker : string,
    description : string,
    [key:string] : string | number | boolean;
}
const coin:Coin = {
    ticker : 'BTC',
    market : 'KRW',
    description : '최초의암호화폐'
}
//1) price속성 추가
coin.price = 10000000; //ok
//2) rank속성 추가
coin.rank = 1; // ok
//3) trade속성추가
coin.trade = true; // ok
//coin.trade = [1,2,3,4] // error
//coin.trade = undefined; // error
//coin.trade = null// error
coin.mkm = 111;

//6
function greetUser({name , age , ...other} : {
    name : string, age:number, [key:string]: string | number
}) {
    console.log(`안녕하세요. 제이름은 ${name} ${age}살 입니다.`); // 안녕하세요. 제이름은 홍길동 30살 입니다.
    console.log(`추가정보 : `, other); // 추가정보 : { email: 'hong@test.com', location: '서울' }
}
const user = {
    name: '홍길동',
    age: 30,
    email: 'hong@test.com',
    location: '서울'
};
greetUser(user);

export default coin;
