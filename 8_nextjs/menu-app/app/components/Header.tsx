'use client'

import Link from "next/link"
import { RootType } from "../store/store"
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";

/*
    # Client Component
     - 모든 컴포넌트의 기본값은 서버컴포넌트이며, 클라이언트 컴포넌트로
     만들려면 파일 최상단에 'use client'를 작성해야 한다. 
     - 사용자와의 상호작용이 필요한 페이지는 전부 클라이언트 컴포넌트로
     생성한다.
*/

export default function Header(){
    const userInfo = useSelector((state:RootType) => state.userInfo);
    const dispatch = useDispatch();
    const router = useRouter();

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
                        {
                            userInfo.isAuthenticated ?
                            (
                               <>
                                <li className="nav-item" >
                                    <Image 
                                        src={userInfo.user?.profile ?? '/default-profile.jpg'} 
                                        alt="프로필" 
                                        width={35} 
                                        height={35} 
                                        className="rounded-full me-2" 
                                        style={{ objectFit: 'cover' }} 
                                    />
                                    {userInfo.user?.name}   
                                </li>
                                <li className="nav-item">
                                    <button
                                        style={{
                                            padding: "6px 12px",
                                            backgroundColor: "#DC3545",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "4px",
                                            cursor: "pointer",
                                            fontSize : "14px"

                                        }}
                                    >
                                        로그아웃
                                    </button>
                                </li>
                            </>     

                            ):(<li className="nav-item">
                            <Link href="/login" className="nav-link">로그인</Link>
                             </li>)
                        }

                        

                    </ul>
                </div>
            </div>
        </header>
    )
}
