import { useState } from "react";
import { useForm } from "./useForm";
import axios from "axios";

interface User {
    name : string;
    email : string;
}

export default function AxiosPost(){
    const [user, handleChange, reset] = useForm<User>({name:"",email:""});
    const [error, setError] = useState("");
    const [submittedUser, setSubmittedUser] = useState<User|null>(null);

    const handleSubmit = () => {
        if(!user.name || !user.email){
            setError("이름과 이메일 모두 입력하세요");
            return;
        }

        axios.post("https://jsonplaceholder.typicode.com/users", user)
        .then((response) => {
            setSubmittedUser(response.data);
            reset();
            setError("");
        })
        .catch((err) => {
            setError("등록중 오류가 발생했습니다.");
        })
    }

      return (
        <div className="form-container">
        <h2>사용자 등록</h2>

        <div className="form-group">
            <label>이름</label>
            <input name="name" value={user.name} onChange={handleChange} />
        </div>

        <div className="form-group">
            <label>이메일</label>
            <input name="email" value={user.email} onChange={handleChange} />
        </div>

        {error && <p className="error-msg">{error}</p>}

        <button onClick={handleSubmit}>등록하기</button>

        {submittedUser && (
            <div className="result-box">
            <h4>등록된 사용자 정보</h4>
            <p>이름: {submittedUser.name}</p>
            <p>이메일: {submittedUser.email}</p>
            </div>
        )}
        </div>
  );
}