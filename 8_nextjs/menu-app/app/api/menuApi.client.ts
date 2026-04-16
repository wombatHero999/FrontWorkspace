import { Menu, MenuCreate } from "../type/menu"
import { api } from "./clientAxios"

export const searchMenus = async function(searchKeyword:{
    type:string, taste:string
}){
    const response = await api.get<Menu[]>("/menus",{
        params:{
            ...searchKeyword
        }
    });

    return response;
}

export const deleteMenu = async (id:number) => {
    return await api.delete(`/menus/${id}`);
}

export const createMenu = async (menu:MenuCreate) => {
    return await api.post(`/menus`, menu);
}

export const editMenu = async (menu:Menu) => {
    return await api.put(`/menus/${menu.id}`, menu);
}

