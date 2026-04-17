'use client'

import { useState } from 'react';
import styles from './Login.module.css';
import { api } from '../api/clientAxios';
import { AxiosError } from 'axios';

export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error,setError] = useState<string | null>(null);

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
            // 로그인 성공시 실행할 로직.
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