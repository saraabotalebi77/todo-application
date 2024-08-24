import { IoIosArrowDown } from "react-icons/io";
import styles from "./../../css/todo-item.module.css";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Priority from "./priority";
import EditTodo from "./edit-todo";
export default function TodoItem({
  todo,
  set_priority,
  set_doneTime,
  set_modal,
  modal,
  page_name,
  readTodoFromDraft,
  set_statusEdit,
  statusEdit,
}) {
  let [statusDoneTodo, set_statusDoneTodo] = useState(!!todo.doneTime);
  let [searchParams, set_searchParams] = useSearchParams();
  //specify searched value in the title of todo
  const startIndex_searchedValue = todo.title
    .toLowerCase()
    .indexOf(searchParams.get("todo")?.toLowerCase());
  const length_searchValue = searchParams.get("todo")?.length;

  // convert the time stamp to Date
  const convert_timestamp_to_date = (timeStamp) => {
    console.log(timeStamp);
    console.log(todo);
    return new Date(timeStamp).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  // handle accordion
  const accordion_handler = (e) => {
    const lable_element = document.getElementById(`accordion-title-${todo.id}`);
    const arrow_icon = lable_element.lastElementChild;
    [...lable_element.parentElement.parentElement.childNodes].forEach(
      (element) => {
        if (lable_element != element.firstElementChild) {
          element.lastElementChild.style.height = "0px";
          element.firstElementChild.style.borderBottom = "0px solid #f1e0ff";
          element.firstElementChild.lastElementChild.style.transform =
            "rotate(0)";
        }
      }
    );
    if (parseInt(lable_element.nextElementSibling.style.height)) {
      lable_element.nextElementSibling.style.height = "0px";
      lable_element.style.borderBottom = "0px solid #f1e0ff";
      arrow_icon.style.transform = "rotate(0)";
    } else {
      lable_element.nextElementSibling.style.height = `${lable_element.nextElementSibling.scrollHeight}px`;
      lable_element.style.borderBottom = "1px solid #f1e0ff";
      arrow_icon.style.transform = "rotate(180deg)";
    }
    if (page_name == "draft-todos" && !todo.readInDraft) {
      readTodoFromDraft(todo.id);
    }
  };
  // handle priority button
  const handle_priorityBtn = (e, number_priority, todoId) => {
    e.stopPropagation();
    set_priority(todoId, number_priority);
  };
  //handle checkBox input
  const handle_checkBoxInput = (e, todoId) => {
    setTimeout(() => {
      if (e.target.checked) {
        set_doneTime(todoId, new Date().getTime());
      } else {
        set_doneTime(todoId, null);
      }
    }, 400);

    set_statusDoneTodo(!statusDoneTodo);
  };
  //handle delete button
  const handle_deleteBtn = (todo) => {
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
  //transfer raftedTodo to todolis
  const transfer_draftedTodo_to_todo = (e, todo) => {
    e.stopPropagation();
    set_modal({
      show: true,
      title: "save as todo",
      text: (
        <>
          Are you sure about transfering <b>{todo.title}</b> to todolist?
        </>
      ),
      todo,
    });
  };
  return (
    <>
      <div className="todo-card overflow-hidden">
        <span
          id={`accordion-title-${todo.id}`}
          onClick={(e) => accordion_handler(e)}
          style={{ transition: "border-bottom 0.4s" }}
          className="flex justify-between items-center p-2"
        >
          <div>
            <span className="flex items-center gap-2">
              {page_name != "draft-todos" && (
                <input
                  type="checkbox"
                  className={`${styles.check_input} cursor-pointer`}
                  onChange={(e) => handle_checkBoxInput(e, todo.id)}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  checked={statusDoneTodo}
                />
              )}
              <h3
                className={`capitalize text-[#5900ff] font-medium ${
                  page_name == "draft-todos" && "px-2 "
                }  ${
                  page_name == "draft-todos" &&
                  !todo.readInDraft &&
                  "text-[18px]"
                }`}
                style={{
                  fontWeight:
                    page_name == "draft-todos" && !todo.readInDraft && 700,
                }}
              >
                {todo.title.includes(searchParams.get("todo")) ? (
                  <span>
                    {todo.title.slice(0, startIndex_searchedValue)}
                    <span className="text-[#ffb301]">
                      {todo.title.slice(
                        startIndex_searchedValue,
                        startIndex_searchedValue + length_searchValue
                      )}
                    </span>
                    {todo.title.slice(
                      startIndex_searchedValue + length_searchValue
                    )}
                  </span>
                ) : (
                  todo.title
                )}
              </h3>
            </span>
            {page_name == "important-todo" && (
              <div className="inline-flex px-[18px]">
                <Priority
                  handle_priority={handle_priorityBtn}
                  todoId={todo.id}
                  todoPriority={todo.priority}
                />
              </div>
            )}
            {page_name == "done-todos" && (
              <p className="px-[22px] md:[mr-4] text-[12px] md:text-[14px] text-[#9174ab]">
                done at {convert_timestamp_to_date(todo.doneTime)}
              </p>
            )}
            {page_name == "show-todos" && (
              <p className="px-[22px] md:[mr-4] text-[12px] md:text-[14px] text-[#9174ab]">
                deadLine :{" "}
                {todo.deadline
                  ? convert_timestamp_to_date(todo.deadline)
                  : "not determined"}
              </p>
            )}
            {page_name == "draft-todos" && (
              <p className="px-2  md:[mr-4] text-[12px] md:text-[14px] text-[#9174ab]">
                created at {convert_timestamp_to_date(todo.createdTime)}
              </p>
            )}
          </div>
          {page_name == "draft-todos" && (
            <button
              onClick={(e) => transfer_draftedTodo_to_todo(e, todo)}
              className="bg-[#6352ff] text-white py-1 px-2 rounded-md text-[12px] font-medium md:text-[14px] md:font-bold mr-[8px]"
            >
              save as todo
            </button>
          )}
          <span
            className="cursor-pointer "
            style={{ transition: "transform 0.4s" }}
          >
            <IoIosArrowDown className="text-[#7330af]" />
          </span>
        </span>
        <div
          style={{ height: "0px", transition: `height 0.4s` }}
          className={`border-b border-solid border-[#dfd1e5] `}
        >
          {page_name != "draft-todos" ? (
            <div className="flex flex-col items-start">
              {todo.description && (
                <p className="px-4 my-2 text-[15px] md:text-[16px] text-[#06357e]">
                  <b className="text-[16px] md:text-[17px] capitalize">
                    description :{" "}
                  </b>
                  {todo.description}
                </p>
              )}
              {page_name !== "show-todos" && (
                <p className="px-4 my-1 text-[15px] md:text-[16px] text-[#06357e]">
                  <b className="text-[16px] md:text-[17px] capitalize">
                    deadline :{" "}
                  </b>{" "}
                  {todo.deadline ? (
                    convert_timestamp_to_date(todo.deadline)
                  ) : (
                    <span className="text-[#c7c9c8]">not determined</span>
                  )}
                </p>
              )}

              {page_name !== "done-todos" && (
                <p className="px-4 my-1 text-[15px] md:text-[16px] text-[#06357e]">
                  <b className="text-[16px] md:text-[17px] capitalize">
                    done time :
                  </b>{" "}
                  {todo.doneTime ? (
                    convert_timestamp_to_date(todo.doneTime)
                  ) : (
                    <span className="text-[#c7c9c8]">not done</span>
                  )}
                </p>
              )}

              <div className="px-4 py-3 w-full flex items-center justify-between">
                {page_name != "important-todo" && (
                  <Priority
                    handle_priority={handle_priorityBtn}
                    todoId={todo.id}
                    todoPriority={todo.priority}
                  />
                )}
                <button
                  onClick={() => handle_deleteBtn(todo)}
                  className="uppercase font-bold text-[14px] text-[#fff] bg-[#ffc428] p-2 rounded-md self-end ml-auto flex"
                >
                  delete
                </button>
              </div>
            </div>
          ) : (
            <EditTodo
              todo={todo}
              set_modal={set_modal}
              modal={modal}
              set_statusEdit={set_statusEdit}
              statusEdit={statusEdit}
            />
          )}
        </div>
      </div>
    </>
  );
}
