import { Route, Routes } from "react-router-dom";
import MainPanel from "./js/ui-components/main-panel";
import DraftTodos from "./js/ui-components/draft-todos";
import ShowTodos from "./js/ui-components/show-todos";
import ImportantTodos from "./js/ui-components/important-todos";
import DoneTodos from "./js/ui-components/done-todos";
import AddTodo from "./js/ui-components/add-todo";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TodoApp() {
  const [modal, set_modal] = useState({});
  const [todos, set_todos] = useState([]);
  const [newTodo, set_newTodo] = useState({});
  const [statusEdit, set_statusEdit] = useState(false);

  useEffect(() => {
    // get data from localStorage
    if (!!localStorage.getItem("tasksList")) {
      set_todos([...JSON.parse(localStorage.getItem("tasksList"))]);
    }
  }, []);

  // set data in localStorage
  const setData_to_localStorage = (todosList) => {
    localStorage.setItem("tasksList", JSON.stringify(todosList));
  };
  //Specify the number of draft tasks that have not been seen
  let number_draftedTodo_notSeen = todos.filter(
    (todo) => !todo.readInDraft && todo.draft
  ).length;

  const save_darftedTodo_as_todo = (todoId) => {
    const newTodos = todos.map((todo) => {
      if (todo.id == todoId) {
        return {
          ...todo,
          draft: false,
          readInDraft: true,
        };
      }
      return todo;
    });
    set_todos(newTodos);
    setData_to_localStorage(newTodos);
    toast.success("Task saved as todoList", {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const set_priority = (todoId, priority) => {
    const newTodos = todos.map((todo) => {
      if (todo.id == todoId) {
        return {
          ...todo,
          priority: priority,
        };
      }
      return todo;
    });
    set_todos(newTodos);
    setData_to_localStorage(newTodos);
  };
  const set_doneTime = (todoId, doneTime) => {
    const newTodos = todos.map((todo) => {
      if (todo.id == todoId) {
        return {
          ...todo,
          doneTime,
        };
      }
      return todo;
    });
    set_todos(newTodos);
    setData_to_localStorage(newTodos);
  };
  const readTodoFromDraft = (todoId) => {
    const newTodos = todos.map((todo) => {
      if (todo.id == todoId) {
        return {
          ...todo,
          readInDraft: true,
        };
      }
      return todo;
    });
    set_todos(newTodos);
    setData_to_localStorage(newTodos);
  };
  const delete_todo = (todoId) => {
    const newTodos = todos.filter((todo) => todo.id != todoId);
    set_todos(newTodos);
    setData_to_localStorage(newTodos);
  };
  const create_todo = (newTodo) => {
    const newTodos = [
      ...todos,
      {
        ...newTodo,
        id: new Date().getTime() + Math.random(),
        createdTime: new Date().getTime(),
        draft: true,
        readInDraft: false,
      },
    ];
    set_todos(newTodos);
    setData_to_localStorage(newTodos);
    toast.success("Task saved as draft ", {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const edit_todo = (editedTodoId, editedTodo) => {
    const newTodos = todos.map((todo) => {
      if (todo.id == editedTodoId) {
        return editedTodo;
      }
      return todo;
    });
    set_todos(newTodos);
    setData_to_localStorage(newTodos);
  };
  return (
    <>
      <Routes>
        <Route
          element={
            <MainPanel
              modal={modal}
              set_modal={set_modal}
              delete_todo={delete_todo}
              create_todo={create_todo}
              edit_todo={edit_todo}
              number_draftedTodo_notSeen={number_draftedTodo_notSeen}
              save_darftedTodo_as_todo={save_darftedTodo_as_todo}
              set_newTodo={set_newTodo}
              set_statusEdit={set_statusEdit}
            />
          }
        >
          <Route
            path="/"
            element={
              <ShowTodos
                todos={todos}
                set_priority={set_priority}
                set_doneTime={set_doneTime}
                set_modal={set_modal}
                modal={modal}
              />
            }
          />
          <Route
            path="/draft"
            element={
              <DraftTodos
                todos={todos}
                set_priority={set_priority}
                set_doneTime={set_doneTime}
                set_modal={set_modal}
                modal={modal}
                readTodoFromDraft={readTodoFromDraft}
                set_statusEdit={set_statusEdit}
                statusEdit={statusEdit}
              />
            }
          />
          <Route
            path="/important"
            element={
              <ImportantTodos
                todos={todos}
                set_priority={set_priority}
                set_doneTime={set_doneTime}
                set_modal={set_modal}
                modal={modal}
              />
            }
          />
          <Route
            path="/done"
            element={
              <DoneTodos
                todos={todos}
                set_priority={set_priority}
                set_doneTime={set_doneTime}
                set_modal={set_modal}
                modal={modal}
              />
            }
          />
          <Route
            path="/add"
            element={<AddTodo set_modal={set_modal} modal={modal} newTodo={newTodo} set_newTodo={set_newTodo} />}
          />
        </Route>
      </Routes>

      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
