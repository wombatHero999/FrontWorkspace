'use client'
import useInput from "@/app/hooks/useInput";
import { Menu } from "@/app/type/menu";
import { useRouter } from "next/navigation";
import { useState } from "react";
import RadioGroup from "../RadioGroup";
import { editMenu } from "@/app/api/menuApi.client";

interface Props {
    menu : Menu;
}

export default function MenuEditForm({menu}:Props){
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [newMenus, handleInputChange] = useInput<Menu>(menu);

    const handleSubmit = async (e:React.SubmitEvent)=> {
        e.preventDefault();

        // 유효성검사 생략
        setIsPending(true);
        setError(null);

        try {
            const response = await editMenu(newMenus);
    
            if(response.status != 204){
                throw new Error('에러발생');
            }

            router.push('/menus/'+menu.id)
            router.refresh();
        }catch(err){
            setError('수정중 오류가 발생했씁니다.');
        }finally{
            setIsPending(false);
        }


    }

    return (
        <div className="menu-test">
            <h4>메뉴 수정하기(PUT)</h4>
            {error && <div className="alert alert-danger">{error}</div>}
            
            <form onSubmit={handleSubmit}>
                <input type="text" value={newMenus.restaurant} onChange={handleInputChange} name="restaurant" className="form-control" />
                <input type="text" value={newMenus.name} onChange={handleInputChange} name="name" className="form-control" />
                <input type="number" value={newMenus.price} onChange={handleInputChange} name="price" className="form-control" />
                
                <div className="form-check form-check-inline">
                    <RadioGroup id="edit-kr" value="kr" checked={newMenus.type === 'kr'} onChange={handleInputChange} name="type" label="한식" />
                    <RadioGroup id="edit-ch" value="ch" checked={newMenus.type === 'ch'} onChange={handleInputChange} name="type" label="중식" />
                    <RadioGroup id="edit-jp" value="jp" checked={newMenus.type === 'jp'} onChange={handleInputChange} name="type" label="일식" />
                </div>
                
                <div className="form-check form-check-inline">
                    <RadioGroup id="edit-hot" value="hot" checked={newMenus.taste === 'hot'} onChange={handleInputChange} name="taste" label="매운맛" />
                    <RadioGroup id="edit-mild" value="mild" checked={newMenus.taste === 'mild'} onChange={handleInputChange} name="taste" label="순한맛" />
                </div>
                <br />
                <input 
                    type="submit" 
                    className="btn btn-block btn-outline-success btn-send" 
                    value={isPending ? "수정 중..." : "수정 완료"} 
                    disabled={isPending} 
                />
            </form>
        </div>
    );

}