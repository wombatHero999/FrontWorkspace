import React, { useState } from 'react';

interface User {
  name:string, 
  age:number, 
  hobby:string[]
}

interface UserInfoProps {
  user : User
  setUser : (user : User) => void
}

export default function UserInfoContainer() {
  const [user,setUser] = useState({
    name : '홍길동',
    age : 30,
    hobby : ['코딩','게임']
  });

  return (
    <div>      
      <UserInfo user={user} setUser={setUser} />
    </div>
  );
}


function UserInfo({user , setUser}: UserInfoProps) {
  const handleChangeName = () => {
     setUser({
      name : '민경민',
      age : 30,
      hobby : ['취미1','취미2']
     });
  }
  return (
    <div style={{ border: '1px solid gray', padding: '10px', marginTop: '10px' }}>
      <h2>사용자 정보</h2>
      <h3>이름: {user.name}</h3>
      <h3>나이: {user.age}</h3>
      <h3>취미: {user.hobby.toString()}</h3>
     <button onClick={handleChangeName}>정보 변경변경</button>
    </div>
  );
}