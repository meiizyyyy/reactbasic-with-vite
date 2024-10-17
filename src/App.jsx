import "./components/todo/todo.css";
import TodoData from "./components/todo/TodoData";
import TodoNew from "./components/todo/TodoNew";
import reactLogo from "./assets/react.svg";
import { useState } from "react";

const App = () => {
    // bien       sau khi chay cai nay se cap nhat ali bien
    const [todoList, setTodoList] = useState([
        // {
        //     id: 1,
        //     name: "Learning React",
        // },
        // {
        //     id: 2,
        //     name: "Watching Youtube",
        // },
    ]);
    // const name = "meiizyyyy";
    // const age = "21";
    // const data = {
    //     address: "Son Tay",
    //     country: "Viet Nam",
    // };
    // {key:value} => object

    const addNewTodo = (name) => {
        const newTodo = {
            id: randomIntFromInterval(1, 99999999),
            name: name,
        };
        // array.push
        // todoList.push(newTodo);
        //khong nen thao tac truc tiep voi State
        setTodoList([...todoList, newTodo]);
    };

    const deleteTodo = (id) => {
        console.log(id);
        const newTodo = todoList.filter((item) => item.id !== id);
        setTodoList(newTodo);
    };

    //Ham random
    const randomIntFromInterval = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    // addNewTodo();
    return (
        <>
            <div className="todo-container">
                <div className="todo-title">Todo List</div>
                <TodoNew addNewTodo={addNewTodo} />
                {/* Truyền dữ liệu từ cha sang con */}

                {/* dieu kien  */}
                {/* {todoList.length > 0 && (
                    <>
                        <TodoData
                            // name={name} age={age} data={data} address={data.address}
                            todoList={todoList}
                        />
                    </>
                )}
                {todoList.length === 0 && (
                    <div className="todo-image">
                        <img src={reactLogo} className="logo" />
                    </div>
                )} */}
                {/* Toan tu 3 ngoi */}
                {todoList.length > 0 ? (
                    <>
                        <TodoData
                            // name={name} age={age} data={data} address={data.address}
                            todoList={todoList}
                            deleteTodo={deleteTodo}
                        />
                    </>
                ) : (
                    <div className="todo-image">
                        <img src={reactLogo} className="logo" />
                    </div>
                )}
            </div>
        </>
    );
};

export default App;
