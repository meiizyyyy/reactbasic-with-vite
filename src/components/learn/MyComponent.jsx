// () = > {}
// Component = html + css + js
import "./style.css";

const MyComponent = () => {
    // const meiizyyyy = "React";
    // const meiizyyyy = 25;
    // const meiizyyyy = true; //boolean
    // const meiizyyyy = undefined;
    // const meiizyyyy = [1, 2, 3];
    const meiizyyyy = {
        name: "Duc",
        age: 25,
    };
    return (
        //Fragment                      //Convert Stringify
        <>
            <div>Hello World! with {JSON.stringify(meiizyyyy)}</div>
            <div>{console.log("Hello meiizyyyy")}</div>
            <div className="child" style={{ fontSize: "50px" }}>
                Hello World! with React Fragment
            </div>
        </>
    );
};

export default MyComponent;
