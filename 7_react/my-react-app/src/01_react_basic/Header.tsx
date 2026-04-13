// 모듈 css import
import headerStyle from './Header.module.css';

export default function Header(){
    return (<div className={headerStyle.header}>header 컴포넌트</div>)
}