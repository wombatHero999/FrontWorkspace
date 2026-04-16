import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
/*
  #1. app/layout.tsx 
   - 최상위 공용 레이아웃으로 서버컴포넌트
   - 사용자와의 상호작용이 필요한 클라리언트 컴포넌트 외 정적인 부분을 서버
   에서 미리 그려 렌더링성능을 향상시킨다. 
   - 서버컴포넌트 안에 포함된 클라이언트 컴포넌트는 서버에서 html구조를
   미리 그리는데 사용한다. 
     - 이후, 클라이언트는 전달받은 html에 하이드레이션을 적용한다. 
*/
export const metadata: Metadata = {
  title: "Menu App",
  description: "Menu App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko">
      <body>
        <div id="container">
           <Header />
           <section id="content">
             <div id="menu-container" className="text-center">
               {children}  
             </div>
           </section>
        </div>
      </body>
    </html>
  );
}
