import "./components/todo/todo.css";
import TodoData from "./components/todo/TodoData";
import TodoNew from "./components/todo/TodoNew";
import reactLogo from "./assets/react.svg";
import { useState } from "react";

const App = () => {
    const [todoList, setTodoList] = useState([
        {
            id: 1,
            name: "Learning React",
        },
        {
            id: 2,
            name: "Watching Youtube",
        },
    ]);

    const name = "meiizyyyy";
    const age = "21";
    const data = {
        address: "Son Tay",
        country: "Viet Nam",
    };
    // {key:value} => object

    const addNewTodo = name => {
        alert(`Hello ${name}`);
    };
    // addNewTodo();
    return (
        <>
            <div className="todo-container">
                <div className="todo-title">Todo List</div>
                <TodoNew addNewTodo={addNewTodo} />
                {/* Truyền dữ liệu từ cha sang con */}
                <TodoData name={name} age={age} data={data} address={data.address} todoList={todoList} />
                <div className="todo-image">
                    <img src={reactLogo} className="logo" />
                </div>
            </div>
        </>
    );
};

export default App;
