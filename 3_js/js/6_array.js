test1.onclick = function(){
    /*
        자바스크립트의 배열은 크기제한이나, 타입제한이 없으며 유용한 메서드들이
        존재한다(ArrayList와 비슷)
    */
    var arr1 = []; // 권장
    var arr2 = new Array();
    var arr3 = new Array(3);//크기지정
    
    console.log(arr1 , arr2, arr3);

    // 값대입
    arr1[0] = 'a';
    arr1[1] = 'b';
    arr1[2] = 'c';

    // 값 가져오기
    console.log(arr1[2]);
    console.log(arr1[100]); // undefined반환

    // 반복문
    // basic loop문
    for(var i =0; i< arr1.length; i++){
        console.log(arr1[i]);
    }

    // 향상된 반복문
    // 1. for .. in문
    //   - 객체, 배열 모두 반복이 가능
    //   - 객체 반복시 i에는 객체의 속석명이 대입
    //   - 배열 반복시 i에는 배열의 인덱스가 대입된다.
    for(var i in arr1){
        console.log(i , arr1[i]);
    }

    /* 
        2. for .. of문
         - java의 향상된 반복문과 가장 비슷한 구문으로, 배열유형의 데이터를
         반복시키기 위해 사용한다.
         - i에는 각 인덱스에 저장된 값이 대입된다.
         - 객체는 반복이 불가능하다.
    */
    for(var item of arr1){
        console.log(item);
    }
};

test2.onclick = function(){
    var arr1 = [1,2,3];
    var arr2 = new Array("철수", "영희", "김밥");

    var arr3 = [
        1,2,3,
        "안녕", true , {id : "mkm"}, ['a','b'] , 
        function(){console.log('zz')}
    ];
    
    arr3[7]();
};
