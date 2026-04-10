class Person {
  constructor(public name:string, private age:number, 
    private readonly address:string){
  }
  introduction() :void{
    console.log(`난 ${this.name}이라고해
        .${this.address}에 살고 나이는 ${this.age}야`)
  }
}
const mkm:Person = new Person('mkm',1234,'서울'); 
mkm.introduction(); // 안녕 난 mkm이라고해.서울에 살고 나이는 1234야

abstract class Pet{
    constructor(public kind:string, public name:string){
    }
    abstract info() : void;
}
class Hamster extends Pet{
    constructor(public kind:string, public name:string,
        public food?:string
    ){
        super(kind,name);
    }
    info(){
        console.log(`이 햄스터는 ${this.kind}종이며, 이름은 ${this.name}입니다.`)
        this.food && console.log(`주식은 ${this.food}를 먹습니다.`)
    }

}
const hamzzi:Hamster = new Hamster('페디그리 햄스터', '햄찌', '해바라기씨');
hamzzi.info();
//이 햄스터는 페디그리 햄스터종이며, 이름은 햄찌입니다.
//주식은 해바라기씨를 먹습니다.

const podong:Hamster = new Hamster('골든 햄스터', '포동');
podong.info();
//이 햄스터는 골든 햄스터종이며, 이름은 포동입니다.


function print<T extends {length:number} = {length:0} >(item?: T): void {
    const value:T = item ?? {length:0} as T; 
    console.log(value.length);
}
print("hello"); // 5
print([1, 2, 3]); // 3
print({length : 100}); // 100
print(); // 0
//print(123); // 컴파일에러발생.

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
  category: string;
}

type ProductUpdateInput = 
Pick<Product,"id" |"name"|"price"> & 
Partial<Pick<Product,"description" | "stock">>

const product1:ProductUpdateInput = {id:1,name:'galaxy1',price:500000};
const product2:ProductUpdateInput = 
{id:2,name:'galaxy2',price:1000000, description: '멋진상품입니다.',stock:5};

//컴파일 에러 발생
// const product3:ProductUpdateInput = 
// {id:3,name:'galaxy3',price:1500000,cateogry:'핸드폰'};

type FormField = "email" | "password" | "nickname" | "phone";
type FormErrorMap = Record<FormField, string>;
const errorMessages: FormErrorMap = {
  email: "이메일을 입력해주세요",
  password: "비밀번호는 8자 이상이어야 합니다",
  nickname: "닉네임을 입력해주세요",
  phone: "전화번호를 입력해주세요",
  //hobby : "취미를 입력해주세요" hobby추가시 컴파일 에러
};

type PostData = {
  id: number;
  title: string;
  content: string;
  comments: string[];
};
function fetchPost({ id, title, content, comments }: PostData) {
    return { id, title, content, comments };
}

type PostResponse = ReturnType<typeof fetchPost>;
type PostParams = Parameters<typeof fetchPost>;
function logAndFetchPost(...args:PostParams): PostResponse{
    console.log(...args);
    return fetchPost(...args);
}

const post = {
  id: 1,
  title: "위고비투약 5일차",
  content: "1키로감량",
  comments: ["위고비얼만가요", "75키로 가자~"]
};
logAndFetchPost(post);
// 1 위고비투약 5일차 1키로감량 [ '위고비얼만가요', '75키로 가자~' ]