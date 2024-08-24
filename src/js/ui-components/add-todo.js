import Edit_Add_Form from "./edit-add-form";
import { useState } from "react";

export default function AddTodo({ set_modal , newTodo , set_newTodo}) {
  // handle add task
  const add_todo = () => {
    set_modal({
      show: true,
      title: "add new task",
      text: (
        <>
          Are you sure about adding <b>{newTodo.title}</b>?
        </>
      ),
      todo :  newTodo,
    });
  };
  return (
    <>
      <Edit_Add_Form todo={newTodo} set_todo={set_newTodo} task={add_todo} type_operation="add-todo"/>
    </>
  );
}
