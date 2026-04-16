import { getMenu } from "@/app/api/menuApi.server";
import { Menu } from "@/app/type/menu";
import { notFound } from "next/navigation";

interface Props {
    params:Promise<{id:string}>
}

export default async function MenuDetailPage({params}:Props){
    const {id} = await params;

    try {
        const menu:Menu = await getMenu(Number(id));

    return (
            <div className="menu-test">
                <h4>메뉴 상세보기(GET)</h4>
                <div className="result" id="menus-result">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>번호</th><th>음식점</th><th>메뉴</th>
                                <th>가격</th><th>타입</th><th>맛</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{menu.id}</td>
                                <td>{menu.restaurant}</td>
                                <td>{menu.name}</td>
                                <td>{menu.price}</td>
                                <td>{menu.type}</td>
                                <td>{menu.taste}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }catch(error){
        return (
            <div>
                데이터를 불러오는중 에러가 발생했습니다.
            </div>
        )
    }
}