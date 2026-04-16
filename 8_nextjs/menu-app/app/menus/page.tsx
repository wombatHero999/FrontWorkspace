import { loadMenus } from "../api/menuApi.server";
import MenuListClient from "../components/menus/MenuList";
import { Menu } from "../type/menu";

export default async function MenuListPage(){
    /*
        #1 메뉴리스트
         - Next.js에서 화면작업을 할때는, 데이터베이스에서 조회가 필요한
         부분과, 필요없는 부분을 나눠서 각각 서버컴포넌트, 클라이언트컴포
         넌트로 구분해줘야 한다. 
         - page.tsx는 서버컴포넌트로 관례상 항상 추가해야하며, 데이터베이스
         조회작업 및 공용 레이아웃(layout.tsx)을 작성한다. 
    */
    /* 
        #2. fetch
         - Next.js의 서버컴포넌트에서 사용하는 fetch는 브라우저의 기본 fetch를
         확장한 함수로 , 단순히 데이터를 가져오는 것을 넘어 데이터를 캐싱하고 재사용
         하는 기능을 추가했다.
         - 따라서 같은 api를 여러 컴포넌트에서 호출해도 실제 네트워크 요청은 한번만
         발생하여 기능을 최적화 할 수 있다. 
         - fetch함수에 cache속성을 추가하지 않는 경우 cache:auto속성이 적용된다. 
            cache:auto는 기본 static render방식으로 페이지를 서비스한다.
        
        # 3. fetch의 옵션별 렌더링 방식
        1) cache : force-cache
         - 빌드타임에 조회한 데이터를 바탕으로 그 데이터만 반환
         - 실제 데이터에 변화가 있더라도 변경사항을 반영하지 못한다
         - 변경사항이 거의 없는 회사소개, 이용약관, 공지사항등에 적용한다. 
         - revalidate함수로 캐시데이터 무효화가 가능하다. 

        2) cache : no-store
         - 실시간 데이터가 중요한 환경에서 사용하는 속성으로 매 요청시마다 데이터를
          새로 가져오는 방식
         - 옵션 미지정시 기본값으로 사용되는 경우가 있다. 
            = fetch에서 cookies, headers, searchParams..등을 사용하는 경우 

        3) revalidate : ISR
         - 데이터를 주기적으로 갱신하고자 할 때 사용하는 방식
         - {next : {revalidate:60}} -> 60초동안만 유지되는 캐시
    */ 
    //const initialMenus:Menu[] = await (await fetch(`http://localhost:8081/api/menus`)).json();
    const initialMenus:Menu[] = await loadMenus();

    return(
        <div className="menu-container">
            <div className="menu-test">
                <h4>전체 메뉴 조회(GET)</h4>
            </div>
            {/* 초기데이터를 클라이언트 컴포넌트에게 전달 */}
            <MenuListClient initialMenus={initialMenus} />
        </div>
    )

}