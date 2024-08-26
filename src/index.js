import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import TodoApp from "./TodoApp";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter basename="todo-application">
      <TodoApp />
    </BrowserRouter>
  </React.StrictMode>
);
