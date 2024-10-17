const TodoData = props => {
    //props = object
    //use destructuring

    const { name, age, data } = props;
    //có thể hiểu dòng trên là:
    // const name = props.name;
    // const age = props.age;

    console.log("check: ", props);

    return (
        <>
            <div className="todo-list">
                <div>My name is {name}</div>
                <div>Learning React</div>
                <div>Watching Youtube</div>
                <div>{JSON.stringify(props.todoList)}</div>
            </div>
        </>
    );
};
export default TodoData;
