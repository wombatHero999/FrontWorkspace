'use client'

import Link from "next/link"

/*
    # Client Component
     - 모든 컴포넌트의 기본값은 서버컴포넌트이며, 클라이언트 컴포넌트로
     만들려면 파일 최상단에 'use client'를 작성해야 한다. 
     - 사용자와의 상호작용이 필요한 페이지는 전부 클라이언트 컴포넌트로
     생성한다.
*/

export default function Header(){
    return (
        <header>
            <div id="header-container">
                <h1 style={{textAlign:"center"}}>Menu App</h1>
                <div className="navbar bg-light navbar-expand">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link href="/" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/menus" className="nav-link">메뉴 전체 조회</Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/menus/insert" className="nav-link">메뉴 추가</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}
