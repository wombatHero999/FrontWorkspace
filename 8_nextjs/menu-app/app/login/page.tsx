'use client'

import { useState } from 'react';
import styles from './Login.module.css';
import { api } from '../api/clientAxios';
import { AxiosError } from 'axios';
import { useUserInfoActions } from '../hooks/useUserInfoActions';

export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error,setError] = useState<string | null>(null);
    const handleLoginSync = useUserInfoActions();


    const handleLogin = async (e:React.SubmitEvent) => {
        e.preventDefault();
        
        if(!email.trim() || !password.trim()){
            setError("이메일과 비밀번호를 모두 입력하세요");
            return;
        }

        setLoading(true);
        setError("");

        api.post("/auth/login",{email, password})
        .then( response => {
            handleLoginSync(response.data.user, response.data.accessToken);
            // 로그인 성공시 실행할 로직.
            /* #1 JWT
              - JSON형식의 데이터를 서명을 통해 위변조를 방지한 토큰으로 인증 및 인가에 사용한다. 
              - JWT를 활용한 인증/인가 매커니즘은 세션기반 로그인방식과 달리 서버가 인증상태를 따로
              저장할 필요가 없기 때문에 무상태서버 구현이 가능하다. 
              - 발급된 JWT토큰은 매 요청시 함께 전달되어 인증에 사용한다. 

               #2. JWT저장위치
               - JWT토큰은 클라이언트의 브라우저에서 관리해야하는 데이터이며, API요청에 사용되는
                 중요한 데이터이다. 
                
                1) localStorage
                 - 브라우저의 로컬저장소로 브라우저가 종료되어도 데이터가 유지된다. 
                 - xss공격에 취약하다. 따라서 jwt와 같은 중요한토큰은 보관하지 않는다. 
                
                2) sessionStorage
                 - 탭단위 세션 저장소로 탭을 답으면 데이터도 삭제된다. (데이터유지시간이 짧다)
                 - xss공격에 취약하다.

                3) 쿠키
                 - 쿠키는 특정 도메인의 경로에 지정된 시간동안만 저장되는 데이터
                 - 쿠키는 HTTP통신시 항상 자동으로 전달된다. 
                 - 기본쿠키는 JS로 접근하여 탈취될 수 있느나 http-only설정시 js로 쿠키제어가 불가능. 
                   (xss에서 안전)

                4) 리액트메모리
                 - 리덕스에 보관시 메모리에만 저장되며, 새로고침시 데이터가 소멸한다. 
                 - xss공경의 위험이 존재하긴 하나 유지시간이 굉장히 짧기 때문에, 공격을 최소활 할
                 수 있다. 

                #3. AccessToken과 RefreshToken
                 - JWT기반 인증에서 사용하는 토큰들
                 - AccessToken실제 인증에 사용하는 토큰으로, 유지시간을 짧게 설정하여 탈취시 부담을 줄여야한다. 
                 - RefreshToken은 accessToken이 만료된경우 이를 갱신하기 위한 토큰. 
                 - RefreshToken이 탈취되면 보안상 위험해지므로 해당 토큰은 안전하게 관리되어야 한다.  
            */
            console.log("로그인 성공!");
        })
        .catch((err:AxiosError) => {
            // 로그인 실패시 실행할 로직
            if(err.response?.status === 404){
                // 등록된 계정이 없는경우
                const doSignUp = confirm("등록된 계정이 없습니다. 회원가입하시겠습니까?");
                if(!doSignUp){
                    setError("계정을 다시한번 확인해주세요.");
                    return;
                }

                api.post("/auth/signup",{email,password})
                .then(res => {
                    console.log("회원가입 성공");
                    handleLoginSync(res.data.user, res.data.accessToken);
                })
                .catch(() => {
                    setError("회원가입 실패");
                })
            }else if( err.response?.status === 401){
                setError("비밀번호를 확인하세요");
            }else {
                console.log(err);
                setError("로그인 처리 중 오류가 발생했습니다.");
            }
        })
        .finally(()=> setLoading(false));
    }

    const handleKakaoLogin = () => {

    }


    return (
         <div className={styles.page}>
            <section className={styles.card}>
                <h2 className={styles.title}>로그인</h2>
                <form onSubmit={handleLogin} className={styles.form}>
                    <label htmlFor="email" className={styles.label}>이메일</label>
                    <input
                        id="email"
                        type="email"
                        className={styles.input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                    />
                    <label htmlFor="password" className={styles.label}>비밀번호</label>
                    <input
                        id="password"
                        type="password"
                        className={styles.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                    />
                    <button type="submit" className={styles.primaryBtn} disabled={loading}>
                        {loading ? "로그인 중…" : "로그인"}
                    </button>
                    {error && <p className={styles.error}>{error}</p>}
                </form>
                 <div className={styles.dividerWrap}>
                    <div className={styles.divider} />
                    <span className={styles.dividerText}>또는</span>
                    <div className={styles.divider} />
                </div>

                <div className={styles.socialGroup}>
                    <button className={`${styles.socialBtn} ${styles.kakao}`} onClick={handleKakaoLogin}>
                        카카오로 로그인
                    </button>
                </div>
            </section>
        </div>
    )
}