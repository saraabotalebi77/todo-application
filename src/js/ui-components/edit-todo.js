import Edit_Add_Form from "./edit-add-form";
import { useEffect, useState } from "react";

export default function EditTodo({ set_modal, todo, set_statusEdit, statusEdit }) {
  const [editTodo, set_editTodo] = useState({...todo});
  
  useEffect(()=>{
    set_editTodo({...todo})
  },[todo]);
  
  // handle edit task
  const edit_todo = () => {
    set_modal({
      show: true,
      title: "edit task",
      text: (
        <>
          Are you sure about editing <b>{editTodo.title}</b>?
        </>
      ),
      todo: editTodo,
    });
  };
  // handle delete todo
  const delete_todo = () => {
    set_modal({
      show: true,
      title: "delete",
      text: (
        <>
          Are you sure about deleting <b>{todo.title}</b>?
        </>
      ),
      todo,
    });
  };
  const cancel_editing = ()=>{
    set_editTodo({...todo})
  }
  return (
    <Edit_Add_Form
      todo={editTodo}
      set_todo={set_editTodo}
      task={edit_todo}
      type_operation="edit-todo"
      statusEdit={statusEdit}
      set_statusEdit={set_statusEdit}
      handle_deleteBtn={delete_todo}
      cancel_editing={cancel_editing}
    />
  );
}
