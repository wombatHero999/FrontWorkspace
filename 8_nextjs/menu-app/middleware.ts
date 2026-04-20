//middleware.ts

import { NextRequestHint } from "next/dist/server/web/adapter";
import { NextRequest, NextResponse } from "next/server";

/*
    #1 Middleware
     - 서버컴포넌트가 렌더링 되거나, API가 실행되기 전에 요청을 가로채서 특정 로직을 수행할
      수 있는 서버측 도구(필터역할수행)
     - 프런트 서버의 인증 및 권한관리, 테스트 등을 수행한다.
     - NextRequest : 가로챈 요청내용
     - NextResponse : 로직 수행 후 다음단계로 넘길 때 사용하는 객체
*/
export async function middleware(request:NextRequest){
    //1. request에서 쿠키정보가져오기
    const refreshToken = request.cookies.get("refreshToken")?.value;
    let accessToken = request.cookies.get("accessToken")?.value;

    // 클라이언트에서 저장한 user권한 읽기
    const rolesString = request.cookies.get('userRoles')?.value || "";
    let userRoles = rolesString.split("|");

    const {pathname} = request.nextUrl;
    let response = NextResponse.next();

    /*
        1. 액세스 토큰은 만료되어 없으나, 리프레쉬 토큰만 남아 있는 경우
         - 그대로 api요청을하면 401에러가 발생하므로, 미들웨어에서 쿠키 재발급요청을
         보낼 예정이다.
    */
    if(!accessToken && refreshToken){
        const refreshRes = await fetch(`http://localhost:8081/api/auth/refresh`,{
                method:'POST',
                headers:{'Cookie':`refreshToken=${refreshToken}`},
            });
        if(refreshRes.ok){
            const setCookie = refreshRes.headers.get('set-cookie');

            // 브라우저로 보낼 응답 생성
            if(setCookie){
                // 새로운 access, role쿠키 
                const newAccessToken = setCookie.split(";").find( 
                    c => c.trim().startsWith("accessToken="))?.split("=")[1];
                const newRoles = setCookie.split(";").find( 
                    c => c.trim().startsWith("userRoles="))?.split("=")[1];    
                if(newAccessToken){
                    accessToken = newAccessToken;

                    // request헤더를 수정하여 서버컴포넌트로 쿠키 전달
                    const requestHeaders = new Headers(request.headers);
                    requestHeaders.set('x-new-access-token',newAccessToken);

                    // 수정된 헤더를 가진 response객체 
                    response = NextResponse.next({
                        request: {
                            headers:requestHeaders
                        }
                    });

                    // 브라우저 쿠키 업데이트를 위한 set-cookie설정
                    response.headers.set('set-cookie',setCookie);
                }
                if(newRoles) userRoles = decodeURIComponent(newRoles).split("|");
            } else{
             // 리프레시 실패시 쿠키 삭제 후 로그인 페이지 리디렉트
             const response = NextResponse.redirect(new URL('/login',request.url))
             response.cookies.delete('accessToken');
             response.cookies.delete('refreshToken');
             return response;
            }            
        }
    }

    // 권한별 사용자 제어
    // 1) 비로그인 사용자(/menus/new, /menus/:id ... 이용 불가)
    const protectedPathPrefixes = ['/menus', '/admin'];
    // 현재 사용자가 요청한 경로가 보호중인 페이지인지 확인
    const isProtectedPage 
        = protectedPathPrefixes.some( prefix => pathname.startsWith(prefix));
    if(isProtectedPage && !refreshToken){
        // 보호대상페이지를 이용하려고하나, 인증되지 않은 경우
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // 2) 권한제어
    if(pathname.includes('/admin') && !userRoles.includes("ROLE_ADMIN")){
        return NextResponse.redirect(new URL('/unauthorized',request.url));
    }

    return response;
}
/* 
    middleware 실행 범위 설정
     - 모든요청에 미들웨어가 동작하면 성능이 저하된다.
     - 특정경로에서만 미들웨어가 작동하도록 범위제한이 필수
*/
export const config = {
    matcher : [
        '/menus/:path*', // /menus로 시작하는 모든 경로
        '/admin/:path*'
    ]
}