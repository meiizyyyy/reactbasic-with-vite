// () = > {}
// Component = html + css + js
import "./style.css";

const MyComponent = () => {
    return (
        //Fragment
        <>
            <div>Hello World! with React</div>
            <div className="child" style={{ fontSize: "50px" }}>
                Hello World! with React Fragment
            </div>
        </>
    );
};

export default MyComponent;
