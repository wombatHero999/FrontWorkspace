import { getMenu } from "@/app/api/menuApi.server";
import MenuEditForm from "@/app/components/menus/MenuEditForm";
import { notFound } from "next/navigation";

interface Props {
    params : Promise<{id:string}>;
}

export default async function MenuEditPage({params}:Props){
    const {id} = await params;

    try{
        const menu = await getMenu(Number(id));

        return (
            <div className="container">
                <MenuEditForm menu={menu} />
            </div>
        )

    }catch(err){
        return notFound();
    }
}