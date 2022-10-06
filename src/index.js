import React from "react";
import ReactDOM from "react-dom";
import Stopwatch from "./Stopwatch";
import "./styles.css";
function App() {
    return (
        <div className="App">
         <link rel="stylesheet"
                 href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" />
            <Stopwatch/>
        </div>
                );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
    <App/> , rootElement);