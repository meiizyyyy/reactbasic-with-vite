const TodoNew = props => {
    console.log(props);
    const { addNewTodo } = props;

    // addNewTodo("Meiizyyyy");

    const handleClick = () => {
        alert("Clicked!");
    };

    const handleOnChange = name => {
        console.log("Handle On Change", name);
    };

    return (
        <>
            <div className="todo-input">
                <input type="text" onChange={(event) => handleOnChange(event.target.value)} />
                <button onClick={handleClick}>Add</button>
            </div>
        </>
    );
};

export default TodoNew;
