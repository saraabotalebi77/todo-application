import { IoClose } from "react-icons/io5";
import styles from "./../../css/modal.module.css";
export default function Modal({modal, set_modal,delete_todo,create_todo,save_darftedTodo_as_todo,edit_todo,set_newTodo,set_statusEdit}) {
  const closeModal = () => {
    set_modal({
      ...modal,
      show: false,
    });
  };
  const handle_deleteBtn = ()=>{
    delete_todo(modal.todo.id);
    closeModal();
  }
  const handle_addBtn = ()=>{
    create_todo(modal.todo);
    set_newTodo({})
    closeModal();
  }
  const handle_transferBtn = ()=>{
    save_darftedTodo_as_todo(modal.todo.id);
    closeModal();
  }
  const handle_editBtn = ()=>{
    edit_todo(modal.todo.id,modal.todo);
    set_statusEdit(false)
    closeModal();
  }
  return (
    <div
      onClick={closeModal}
      className={`fixed z-[100] top-0 left-0 h-full w-full transition-colors ${
        modal.show
          ? "pointer-events-auto cursor-pointer bg-[#120f247a]"
          : "pointer-events-none bg-transparent"
      } `}
    >
      <div
        className={`${styles.modal} ${modal.show && styles.active_modal} bg-white max-h-[400px] max-w-[700px] rounded-md flex flex-col cursor-auto absolute left-2/4`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4">
          <h4 className="capitalize font-medium">{modal.title}</h4>
          <button onClick={closeModal}>
            <IoClose className="text-[#abaaaa] text-[20px]" />
          </button>
        </div>
        <div className="grow overflow-auto px-4">
          <p>{modal.text}</p>
        </div>
        <div className="flex flex-row-reverse gap-2 p-4">
          <button onClick={closeModal} className="bg-[#6352ff] text-white py-1 px-3 rounded-md">cancel</button>
          {modal.title=="delete" && <button onClick={handle_deleteBtn} className="bg-[#ffb301] text-white py-1 px-3 rounded-md">delete</button>}
          {modal.title=="add new task" && <button onClick={handle_addBtn} className="bg-[#ffb301] text-white py-1 px-3 rounded-md">add</button>} 
          {modal.title=="save as todo" && <button onClick={handle_transferBtn} className="bg-[#ffb301] text-white py-1 px-3 rounded-md">save as todo</button>} 
          {modal.title=="edit task" && <button onClick={handle_editBtn} className="bg-[#ffb301] text-white py-1 px-3 rounded-md">edit</button>} 
        
        </div>
      </div>
    </div>
  );
}
