import "./components/todo/todo.css";
import TodoData from "./components/todo/TodoData";
import TodoNew from "./components/todo/TodoNew";
import reactLogo from "./assets/react.svg";

const App = () => {
    const name = "meiizyyyy";
    const age = "21";
    const data = {
        address: "Son Tay",
        country: "Viet Nam",
    };
    // {key:value} => object

    return (
        <>
            <div className="todo-container">
                <div className="todo-title">Todo List</div>
                <TodoNew />
                {/* Truyền dữ liệu từ cha sang con */}
                <TodoData name={name} age={age} data={data} address={data.address} />
                <div className="todo-image">
                    <img src={reactLogo} className="logo" />
                </div>
            </div>
        </>
    );
};

export default App;
