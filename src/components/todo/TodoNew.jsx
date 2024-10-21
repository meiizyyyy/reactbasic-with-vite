import { useState } from "react";

const TodoNew = (props) => {
    //useState Hook
    // const valueInput = "Meiizyyyy"
    const [valueInput, setValueInput] = useState("Meiizyyyy");

    const { addNewTodo } = props;

    // addNewTodo("Meiizyyyy");
    const handleClick = () => {
        addNewTodo(valueInput);
        setValueInput("");
    };

    const handleOnChange = (name) => {
        setValueInput(name);
    };

    return (
        <>
            <div className="todo-input">
                <input type="text" autofocus onChange={(event) => handleOnChange(event.target.value)} value={valueInput} />
                <button onClick={handleClick}>Add</button>
                <div>My text input: {valueInput} </div>
            </div>
        </>
    );
};

export default TodoNew;
