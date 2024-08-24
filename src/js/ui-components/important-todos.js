import TodoItem from "./todo-item";

export default function ImportantTodos({
  todos,
  set_priority,
  set_doneTime,
  set_modal,
  modal
}) {
  const done_important_todo = todos
    .filter(
      (todo) => (todo.priority >= 1 && todo.priority <= 5 && !todo.draft && !todo.doneTime))
    .sort((a, b) => b.priority - a.priority);

  const undone_important_todo = todos
    .filter((todo) => (todo.priority >= 1 && todo.priority <= 5 && !todo.draft && todo.doneTime))
    .sort((a, b) => b.priority - a.priority);
  return (
    <>
      {done_important_todo.length !== 0 ? (
        <div className="border border-solid border-[#e0e0e0] mb-8">
          { done_important_todo.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                set_priority={set_priority}
                set_doneTime={set_doneTime}
                set_modal={set_modal}
                modal={modal} 
                page_name="important-todo"
              />
            ))}
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <span className="capitalize text-[#adabab]">
            None of the undone tasks have been prioritized
          </span>
        </div>
      )}

      <h3 className="text-xl capitalize font-medium text-lg py-1 mb-2">
        done todos
      </h3>

      {undone_important_todo.length !== 0 ? (
        <div className="border border-solid border-[#e0e0e0]">
          {undone_important_todo.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              set_priority={set_priority}
              set_doneTime={set_doneTime}
              set_modal={set_modal}
              modal={modal} 
              page_name="important-todo"
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <span className="capitalize text-[#adabab]">
          None of the prioritized tasks have been completed
          </span>
        </div>
      )}
    </>
  );
}
