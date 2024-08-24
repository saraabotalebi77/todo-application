import DatePicker from "react-multi-date-picker";
import Priority from "./priority";
import { useState } from "react";
import transition from "react-element-popper/animations/transition";
import opacity from "react-element-popper/animations/opacity";
import "./../../css/edit-add-form.css";

const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

export default function Edit_Add_Form({
  todo,
  set_todo,
  task,
  type_operation,
  statusEdit,
  set_statusEdit,
  handle_deleteBtn,
  cancel_editing
}) {

  const [titleValidation, set_titleValidation] = useState(null);
  //handle reset button
  const handle_resetBtn = () => {
    set_todo({});
  };
  //handle cancel button 
  const handle_cancelBtn = ()=>{
    set_statusEdit(false)
    cancel_editing();
  }
  //handle change input
  const handle_changeInput = (e) => {
    set_todo({
      ...todo,
      [e.target.name]: e.target.value,
    });

    if (
      document.getElementById("input-title").value.length < 5 &&
      document.getElementById("input-title").value.length > 0
    ) {
      set_titleValidation("the length of title should not be less that 5");
    } else if (document.getElementById("input-title").value.length == 0) {
      set_titleValidation("title is required");
    } else {
      set_titleValidation("");
    }
  };
  // ****************************
  const handleDate = (deadlineDate)=>{
    set_todo({
      ...todo,
      deadline:  typeof deadlineDate === "object" ? deadlineDate.toDate().getTime() :  todo.deadline,
    });
  }
  // ************************************
  //   handle submit form
  const handle_submit = () => {

    // if there is no error , create or update task
    if (!titleValidation && todo.title) {
      task();
    } else {
      set_titleValidation("title is required");
    }
  };
  //   handle priority
  const handle_priority = (e, priority) => {
    set_todo({
      ...todo,
      priority,
    });
  };
  //   handle datePicker
  const handleChangeDatePicker = (date, { input, isTyping }) => {
    if (!isTyping) return handleDate(date); // user selects the date from the calendar and no needs for validation.

    let value = input.value;

    for (let digit of digits) {
      value = value.replace(new RegExp(digit, "g"), digits.indexOf(digit));
    }

    const strings = value.split("/");
    const numbers = strings.map(Number);
    const [year, month, day] = numbers;

    if (input.value && numbers.some((number) => isNaN(number))) {
      return false; //in case user enter something other than digits
    }

    if (month > 12 || month < 0) return false; //month < 0 in case user want to type 01
    if (day < 0 || (date && day > date.day)) return false;
    if (strings.some((val) => val.startsWith("00"))) return false;

    return handleDate(date);
  };
  return (
    <div
      onSubmit={(e) => handle_submit(e)}
      className={`${type_operation == "edit-todo" && "py-3 px-4"}`}
    >
      <div
        className={`${
          type_operation == "edit-todo" && !statusEdit
            ? "pointer-events-none"
            : "pointer-events-auto"
        }`}
      >
        <label className="w-full flex flex-col mb-2">
          <span className="flex items-center after:content-['*'] capitalize">
            title{" "}
          </span>
          <input
            type="text"
            id="input-title"
            value={todo.title || ""}
            onChange={(e) => handle_changeInput(e)}
            name="title"
            placeholder="title task"
            className="rounded-[4px] py-1 px-2 border border-solid border-gray-300 focus:outline focus:outline-2 focus:outline-indigo-600 placeholder:text-gray-500"
          />
          <small className=" text-[#cf0000] mx-2 my-[2px]">
            {titleValidation}
          </small>
        </label>
        <label className="w-full flex flex-col mb-2">
          <span className="capitalize">description</span>
          <textarea
            value={todo.description || ""}
            name="description"
            onChange={(e) => handle_changeInput(e)}
            placeholder="about task"
            className="rounded-[4px] py-1 px-2  resize-none border border-solid border-gray-300 focus:outline focus:outline-2 focus:outline-indigo-600 placeholder:text-gray-500"
          ></textarea>
        </label>
        <span className="capitalize block">deadline</span>
        <DatePicker
          className="yellow"
          minDate={new Date()}
          animations={[opacity(), transition({ from: 35, duration: 800 })]}
          value={todo.deadline}
          onChange={handleChangeDatePicker}
          calendarPosition="bottom-left"
          placeholder="deadline date"
        />
        <div className="flex flex-col mb-5 mt-2">
          <span className="capitalize">priority</span>
          <div>
            <Priority
              handle_priority={handle_priority}
              todoPriority={todo.priority}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-2 ">
        {type_operation == "add-todo" && (
          <>
            <button
              onClick={() => handle_resetBtn()}
              type="button"
              className="bg-[#6352ff] text-white py-1 px-3 rounded-md capitalize"
            >
              reset
            </button>
            <button
              onClick={handle_submit}
              type="button"
              className="bg-[#ffb301] text-white py-1 px-3 rounded-md capitalize"
            >
              save
            </button>
          </>
        )}
        {type_operation == "edit-todo" && (
          <>
            {!statusEdit ? (
              <button
                onClick={handle_deleteBtn}
                type="button"
                className="bg-[#6352ff] text-white py-1 px-3 rounded-md capitalize"
              >
                delete
              </button>
            ) : (
              <button
                onClick={handle_cancelBtn}
                type="button"
                className="bg-[#6352ff] text-white py-1 px-3 rounded-md capitalize"
              >
                cancel
              </button>
            )}
            {!statusEdit ? (
              <button
                onClick={() => {
                  set_statusEdit(true);
                }}
                type="button"
                className="bg-[#ffb301] text-white py-1 px-3 rounded-md capitalize"
              >
                edit
              </button>
            ) : (
              <button
                onClick={handle_submit}
                type="button"
                className="bg-[#ffb301] text-white py-1 px-3 rounded-md capitalize"
              >
                apply changing
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
