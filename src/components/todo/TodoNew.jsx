const TodoNew = props => {
    console.log(props);
    const { addNewTodo } = props;

    // addNewTodo("Meiizyyyy");
    return (
        <>
            <div className="todo-input">
                <input type="text" />
                <button>Add</button>
            </div>
        </>
    );
};

export default TodoNew;
