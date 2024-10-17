import { useState } from "react";

const TodoNew = (props) => {
    //useState Hook
    // const valueInput = "Meiizyyyy"
    const [valueInput, setValueInput] = useState("Meiizyyyy");

    const { addNewTodo } = props;

    // addNewTodo("Meiizyyyy");
    const handleClick = () => {
        console.log(`Check ${valueInput}`);
    };

    const handleOnChange = (name) => {
        setValueInput(name);
    };

    return (
        <>
            <div className="todo-input">
                <input type="text" onChange={(event) => handleOnChange(event.target.value)} />
                <button onClick={handleClick}>Add</button>
                <div>My text input: {valueInput} </div>
            </div>
        </>
    );
};

export default TodoNew;
