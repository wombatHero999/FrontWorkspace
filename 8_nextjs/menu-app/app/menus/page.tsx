
export default async function MenuListPage(){
    /*
        #1 메뉴리스트
         - Next.js에서 화면작업을 할때는, 데이터베이스에서 조회가 필요한
         부분과, 필요없는 부분을 나눠서 각각 서버컴포넌트, 클라이언트컴포
         넌트로 구분해줘야 한다. 
         - page.tsx는 서버컴포넌트로 관례상 항상 추가해야하며, 데이터베이스
         조회작업 및 공용 레이아웃(layout.tsx)을 작성한다. 
    */

    const initialMenus = await fetch(`http://localhost:8081/api/menus`);

    console.log(initialMenus);
    return(
        <div className="menu-container">
            <div className="menu-test">
                <h4>전체 메뉴 조회(GET)</h4>
            </div>
            {/* 초기데이터를 클라이언트 컴포넌트에게 전달 */}
        </div>
    )

}