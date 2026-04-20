'use client'

import Link from "next/link"
import { RootType } from "../store/store"
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { api } from "../api/clientAxios";
import { logout } from "../features/userInfoSlice";

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
    const [mounted, setMounted] = useState(false);

    useEffect(()=>{
        setMounted(true);
    },[]);

    // if(!mounted){
    //     return <li>Loading...</li>
    // }

    const handleLogout = () => {
        api.post("/auth/logout")
        .then(() => {
            dispatch(logout());
            router.push("/login");
        })  
    };

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
                            /* 
                                #1. 조건부 렌더링 사용시 하이드레이션 에러 발생
                                 - 서버컴포넌트의 상태와 하이드레이션시 결과가 다른 경우 발생하는 에러 
                                  -> isAutenticated는 redux에 존재하는 데이터인데 , 이 코드는 클라
                                  이언트 컴포넌트에서만 알 수있기 때문
                                 - 하이드레이션에러블 방지하기 위해선, 서버,클라이언트 모두 동일한
                                 값을 보게 해야한다. => mounted설정.
                            */
                            !mounted ? (<li>loading...</li>) :
                            userInfo.isAuthenticated ? 
                            (
                               <>
                                <li className="nav-item">
                                    {/* 
                                        # 2. Image
                                         - next.js에서 img대신 사용하는 Image최적화 태그 
                                         - 이미지가 실제 화면에 나타날때까지 로딩을 지연하는 지연로딩기능
                                         - 사용자의 기기에 맞춰 적절한 크기의 이미지를 자동생성
                                         - 이미지가 로드되면서 화면이 덜컥거리는 현상을 방지해주고,
                                           브라우저에서 지원하는 경우 고품질 포맷으로도 변환. 
                                         - 최적화된 이미지는 .next/cache/images에 저장된다. 
                                           이때 변경한 이미지의 파일명이 그대로인 경우 캐싱된 이미지가 서비스되어
                                           변경사항이 반영되지 않을 수 있다. 
                                        해결방법 ) 이미지 변경시 변경사항을 함께 저장하여 이미지 url뒤에 붙여준다. 
                                        이럴경우, next.js와 브라우저는 새로운 이미지로 인식하게 된다.  
                                        ex) `${userInfo.user?.profile}?v=${userInfo.user?.updateAt}`
                                    */}
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
                                        onClick={handleLogout}
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
