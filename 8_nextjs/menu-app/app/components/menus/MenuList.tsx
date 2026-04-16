'use client'

import useInput from "@/app/hooks/useInput";
import { useRouter } from "next/navigation";
import { useState } from "react";
import RadioGroup from "../RadioGroup";
import { Menu } from "@/app/type/menu";
import axios from "axios";
import { deleteMenu, searchMenus } from "@/app/api/menuApi.client";

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

    // #5. 메뉴 삭제 버튼
    const handleDelete = async(id:number) => {
        if(!confirm("정말 삭제하시겠습니까?")) return;
        const response = await deleteMenu(id);

        if(!(response.status === 204)){
            throw new Error("에러가 발생했습니다.", response.data);
        }
        setMenus((prev) => {
            return prev.filter( menu => menu.id !== id);
        });
    }

    // #4. 메뉴검색버튼
    /*
        # CORS설정
         - 브라우저는 보안상의 이유로 SOP정책을 사용한다
            SOP(Same Origin Policy)
            - 동일한 출처에서만 리소스 요청을 허용하는 정책
            - 출처(Origin) : 프로토콜 + ip주소 + 포트번호
         - 이때 요청을 받는 서버측에서 현재 출처에 대한 요청을 허용할지를 
           CrossOrigin속성에 추가해줘야 한다. 
         - 단, 서버컴포넌트는 브라우저에서 실행되는게 아니므로, cors제약에서
         쟈유롭다. 
    */
    const handleSearchMenus = async () => {
        setIsLodaing(true);
        try {
            // const response = await axios.get<Menu[]>("http://localhost:8081/api/menus", {
            //     params:{
            //         type : searchKeyword.type,
            //         taste : searchKeyword.taste
            //     }
            // });
            const response = await searchMenus(searchKeyword);
            if(response.status != 200){
                throw new Error("에러발생");
            }
            setMenus(response.data);
        }catch(err){
            console.log('에러발생', err);
        }finally{
            setIsLodaing(false);
        }
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