import { useRef } from "react";
import styles from './TodoList.module.css';
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { addTodos, deleteTodo, toggleComplete } from "../features/todoSlice";

function TodoList(){
    const inputRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();
    const todos = useSelector((state:RootState) => state.todoList.todos);

    const handleAddTodo = () => {
        const inputvalue = inputRef.current?.value?.trim();
        if(!inputvalue){
            alert("값을 입력하세요..");
            return;
        }
        dispatch(addTodos(inputvalue));
        if(inputRef.current) inputRef.current.value = "";
    }

    return(
       <div className={styles.wrapper}>
          <h2 className={styles.title}>Todo List</h2>
            <input ref={inputRef} type="text" className={styles.input}
              placeholder="할 일을 입력하세요…" />
            <button className={styles.addBtn} onClick={handleAddTodo}>Add</button>    
          <ul className={styles.list}>    
              {
                todos && todos.map((todo) => {
                    return (
                    <li className={styles.item} key={todo.id}>
                        <span 
                        onClick={()=> dispatch(toggleComplete(todo.id))}                 
                        className={`${styles.text} ${todo.completed ? styles.completed :''}`}>
                        {todo.text}
                        </span>
                        <button className={styles.deleteBtn}
                        onClick={() => {
                            dispatch(deleteTodo(todo.id))
                        }}
                        >
                        ❌
                        </button>
                    </li>
                    )
                })
              }          
              <li className={styles.item}>
                <span                  
                  className={`${styles.text} ${styles.completed}`}>
                  맛있게 점심먹기!!
                </span>
                <button className={styles.deleteBtn}>
                  ❌
                </button>
               </li>
               <li>
                 <span                  
                  className={styles.text}>
                  열심히 운동하기~!!
                </span>
                <button className={styles.deleteBtn}>
                  ❌
                </button>       
              </li>
          </ul>
        </div>
    )
}

export default TodoList;