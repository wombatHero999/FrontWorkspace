'use client'

import useInput from "@/app/hooks/useInput";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface MenuListClientProps {
    initialMenus : Menu[]
}

export default function MenuListClient({initialMenus} : MenuListClientProps){

    // #1. 서버컴포넌트에서 전달받은 초기 데이터로 상태값 설정
    const [menus, setMenus] = useState<Menu[]>(initialMenus);
    const [isLoading, setIsLodaing] = useState(false);

    // #2. 사용자와 상호작용하는 검색 state선언 
    const [searchKeyword, onChangeKeyword] = useInput({
        type : 'all',
        taste : 'all'
    })

    // #3. 페이지이동을 위한 훅함수
    const router = useRouter();

    // #4. 메뉴 삭제 버튼
    const handleDelete = async(id:number) => {

    }

    return (
        <>
            <div className="form-check form-check-inline">
                <RadioGroup id="get-no-type" value="all" name="type" checked={searchKeyword.type === 'all'} onChange={onChangeKeyword} label="모두"/>
                <RadioGroup id="get-kr" value="kr" name="type" checked={searchKeyword.type === 'kr'} onChange={onChangeKeyword} label="한식"/>
                <RadioGroup id="get-jp" value="jp" name="type" checked={searchKeyword.type === 'jp'} onChange={onChangeKeyword} label="일식"/>
                <RadioGroup id="get-ch" value="ch" name="type" checked={searchKeyword.type === 'ch'} onChange={onChangeKeyword} label="중식"/>
            </div>
            <div className="form-check form-check-inline">
                <RadioGroup id="get-no-taste" value="all" name="taste" checked={searchKeyword.taste === 'all'} onChange={onChangeKeyword} label="모두"/>
                <RadioGroup id="get-mild" value="mild" name="taste" checked={searchKeyword.taste === 'mild'} onChange={onChangeKeyword} label="순한맛"/>
                <RadioGroup id="get-hot" value="hot" name="taste" checked={searchKeyword.taste === 'hot'} onChange={onChangeKeyword} label="매운맛"/>
            </div>
            <input type="button" className="btn btn-block btn-outline-success btn-send" value={isLoading ? "검색 중..." : "검색"} onClick={handleSearchMenus} disabled={isLoading} />

            <div className="result">
                <table className="table">
                    <thead>
                        <tr>
                            <th>번호</th><th>음식점</th><th>메뉴</th><th>가격</th><th>타입</th><th>맛</th><th>버튼</th>
                        </tr>
                    </thead>
                    <tbody>
                        {menus.map((menu) => (
                            <tr key={menu.id} onClick={() => router.push(`/menus/${menu.id}`)} style={{cursor: 'pointer'}}>
                                <td>{menu.id}</td>
                                <td>{menu.restaurant}</td>
                                <td>{menu.name}</td>
                                <td>{menu.price}</td>
                                <td>{menu.type}</td>
                                <td>{menu.taste}</td>
                                <td>
                                    <button className="btn" onClick={(e) => {
                                        e.stopPropagation();
                                        router.push(`/menus/${menu.id}/edit`);
                                    }}>수정</button>
                                    <button className="btn" onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(menu.id);
                                    }}>삭제</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}