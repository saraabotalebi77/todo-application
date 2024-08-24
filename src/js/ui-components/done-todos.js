import TodoItem from "./todo-item";
export default function DoneTodos({
  todos,
  set_priority,
  set_doneTime,
  set_modal,
  modal
}) {
  const filter_todos = todos
    .filter((todo) => !!todo.doneTime)
    .sort((a, b) => b.doneTime - a.doneTime);
  return (
    <>
      {filter_todos.length !== 0 ? (
        <div className="border border-solid border-[#f1e0ff]">
          {filter_todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              set_priority={set_priority}
              set_doneTime={set_doneTime}
              set_modal={set_modal}
              modal={modal} 
              page_name="done-todos"
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <span className="capitalize text-[#adabab]">
            this section is empty
          </span>
        </div>
      )}
    </>
  );
}
