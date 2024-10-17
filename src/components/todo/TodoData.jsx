const TodoData = (props) => {
    //props = object
    //use destructuring

    const {
        // name, age, data,
        todoList,
    } = props;
    //có thể hiểu dòng trên là:
    // const name = props.name;
    // const age = props.age;

    return (
        <>
            <div className="todo-list">
                {/* <div>My name is {name}</div> */}
                {todoList.map((item, index) => {
                    console.log("check map ", item, index);
                    return ( 
                        <div className="todo-item" key={item.id}>
                            <div>{item.name}</div>
                            <button>Delete</button>
                        </div>
                    );
                })}

                {/* <div>Learning React</div>
                <div>Watching Youtube</div> */}

                {/* <div>{JSON.stringify(props.todoList)}</div> */}
            </div>
        </>
    );
};
export default TodoData;
