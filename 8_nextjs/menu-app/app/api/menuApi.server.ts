import { Menu } from "../type/menu";
import { serverFetch } from "./serverFetch";


export const loadMenus = async ():Promise<Menu[]> => {
    // 항상 새로운 데이터 fetch
    //return serverFetch("/menus",{cache:'no-store'})

    // 10초 간격 캐싱
    return serverFetch("/menus",{next:{revalidate:10}})
}

export const getMenu = async(id:number):Promise<Menu> => {
    return serverFetch(`/menus/${id}`, {next :{tags:['menus']}})
}
