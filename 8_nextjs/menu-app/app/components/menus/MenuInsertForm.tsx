'use client'

import useInput from "@/app/hooks/useInput"
import { initMenu, MenuCreate } from "@/app/type/menu"
import { useRouter } from "next/navigation";
import { useState } from "react";
import RadioGroup from "../RadioGroup";
import { createMenu } from "@/app/api/menuApi.client";

export default function MenuInsertForm(){
    const [menu, handleInputChange] = useInput<MenuCreate>(initMenu);

    const router = useRouter();
    /* 
        # useRouter
         - next.js에서 페이지 이동시 사용하는 훅 함수
         - push(url) : 지정한 url로 페이지 이동(새로고침 없이 컴포넌트 교체)
         - replace(url) : 지정한 url로 히스토리를 교체
         - refresh() : 새로고침. -> 페이지 새로고침이 아니라 서버컴포넌트로부터
                       데이터를 새로 받기위한 새로고침
    */
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string|null>(null);

    const insertMenu = async (e:React.SubmitEvent) => {
        // 여기 + menuapi.client쪽 코드 작성 
        e.preventDefault();
        setIsPending(true);

        const response = await createMenu(menu);

        if(response.status != 201){
            throw new Error("등록실패");
        }
        const loc = response.headers['location'];

        router.push(loc ?? "/menus");
        router.refresh();

        setIsPending(false);
    }

    return (
         <div className="menu-test">
            <h4>메뉴 등록하기(POST)</h4>
            {error && <div className="alert alert-danger">{error}</div>}
            
            <form id="menuEnrollFrm" onSubmit={insertMenu}>
                <input type="text" name="restaurant" placeholder="음식점" className="form-control" onChange={handleInputChange} />
                <input type="text" name="name" placeholder="메뉴" className="form-control" onChange={handleInputChange} />
                <input type="number" name="price" placeholder="가격" className="form-control" onChange={handleInputChange} />
                
                <div className="form-check form-check-inline">
                    <RadioGroup id="ins-kr" value="kr" name="type" checked={menu.type === 'kr'} onChange={handleInputChange} label="한식" />
                    <RadioGroup id="ins-ch" value="ch" name="type" checked={menu.type === 'ch'} onChange={handleInputChange} label="중식" />
                    <RadioGroup id="ins-jp" value="jp" name="type" checked={menu.type === 'jp'} onChange={handleInputChange} label="일식" />
                </div>
                
                <div className="form-check form-check-inline">
                    <RadioGroup id="ins-hot" value="hot" name="taste" checked={menu.taste === 'hot'} onChange={handleInputChange} label="매운맛" />
                    <RadioGroup id="ins-mild" value="mild" name="taste" checked={menu.taste === 'mild'} onChange={handleInputChange} label="순한맛" />
                </div>
                <br />
                <input 
                    type="submit" 
                    className="btn btn-block btn-outline-success btn-send" 
                    value="등록" 
                    disabled={isPending} 
                />
            </form>
        </div>
    );
}