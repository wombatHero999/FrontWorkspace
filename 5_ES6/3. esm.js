function sayHi(){
    console.log("hello module");
}
const abc = "abc";

export {sayHi, abc};
export const fn1 = (a) => console.log(a);

//default문법
export default abc;