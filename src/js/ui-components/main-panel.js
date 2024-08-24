import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import Modal from "./modal";
import Header from "./header";
import Navbar from "./navbar";


export default function MainPanel({
  modal,
  set_modal,
  delete_todo,
  create_todo,
  number_draftedTodo_notSeen,
  save_darftedTodo_as_todo,
  edit_todo,
  set_newTodo,
  set_statusEdit
}) {
  const [openMenu, set_openMenu] = useState(false);
  const location = useLocation();
  return (
    <>
      <div className="flex gap-3 md:pr-3">
        <Navbar
          openMenu={openMenu}
          set_openMenu={set_openMenu}
          location={location}
          number_draftedTodo_notSeen={number_draftedTodo_notSeen}
        />
        <div className="grow md:w-4/5">
          <Header set_openMenu={set_openMenu} location={location} />
          <main className="px-4">
            <Outlet />
          </main>
        </div>
      </div>
      <Modal
        modal={modal}
        set_modal={set_modal}
        delete_todo={delete_todo}
        create_todo={create_todo}
        edit_todo={edit_todo}
        save_darftedTodo_as_todo={save_darftedTodo_as_todo}
        set_newTodo={set_newTodo}
        set_statusEdit={set_statusEdit}
      />
      
    </>
  );
}
