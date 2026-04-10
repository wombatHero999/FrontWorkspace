/* 
    #1. 컴포넌트의 이름은 "대문자"로 시작해야 한다. 
     - 리액트는 렌더링할 요소가 소문자로 시작하는 경우 html태그로,
       대문자로 시작하는 경우 리액트 컴포넌트로 인식한다. 
*/
export function Component(){
    /*
        #2. 함수형 컴포넌트는 항상 1개의 jsx요소를 반환해야한다. 
         - 여러태그를 동시에 반환하고자 한다면 부모요소로 감싸줘야 한다.
        #3. return되는 요소는 ()로 감싸준다(선택사항)
    */

    return (<>
        <Header/>
        <hr/><hr/>
        <Footer />
    </>);    
}

function Header(){
    /*
        #4. 모든요소는 반드시 닫아줘야한다. 
         - <img> <input> 등 종료태그가 없는 태그도 닫아줘야한다.
        #5. jsx문법에서 자바스크립트변수를 바인딩할때는 {}를 사용한다. 
        #6. style속성은 객체로 작성하여 바인딩한다.
    */
    const title = "Hello React";
    const style = {};

    return (
        <header style={style}>
            <img src="/favicon.svg" />
            <h1>{title}</h1>
        </header>
    );
}
import './01.Component.css';

function Footer(){
    /*
        #8 . 이벤트 속성은 카멀케이스로 작성한다
         - html에서는 onclick = "함수()";
         - jsx => onClick = {함수}
    */
    const clickHandler = () => {
        console.log("클릭해주셔서 감사합니다..");
    }

    return (
        // #7. 클래스속성은 className으로 작성한다.
        <footer className="footer">
            {/* jsx주석영역 */}
            <button onClick={clickHandler} >저를 클릭하세요..</button>
        </footer>
    )
}
