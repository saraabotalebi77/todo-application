import { Link,useSearchParams } from "react-router-dom";
import styles from "./../../css/navbar.module.css";
import { IoClose } from "react-icons/io5";
import { RiDraftLine } from "react-icons/ri";
import { FaRegStar } from "react-icons/fa6";
import { FaListCheck } from "react-icons/fa6";
import { GoChecklist } from "react-icons/go";
import { MdFormatListBulletedAdd } from "react-icons/md";


export default function Navbar({ openMenu, set_openMenu, location, number_draftedTodo_notSeen }) {
  const [searchParams, set_searchParams] = useSearchParams();
  let activeLink = 0;
  if (location.pathname == "/draft") {
    activeLink = 1;
  } else if (location.pathname == "/important") {
    activeLink = 2;
  } else if (location.pathname == "/done") {
    activeLink = 3;
  } else if (location.pathname == "/add") {
    activeLink = 4;
  }

  const hide_overly = (e) => {
    if (e.target == document.getElementById("navbar")) {
      set_openMenu(false);
    }
  };
  
  return (
    <nav
      id="navbar"
      onClick={(e) => hide_overly(e)}
      className={`fixed md:sticky z-[51] top-0 h-screen min-h-max w-full md:w-1/5 md:min-w-[220px] md:pointer-events-auto ${
        openMenu
          ? "pointer-events-auto backdrop-blur-sm cursor-pointer"
          : "pointer-events-none bg-transparent backdrop-blur-none"
      } `}
    >
      <div
        className={`${
          styles.menu_wrapper
        } transition-left duration-300 ease-in-out absolute md:static  ${
          openMenu ? "left-0" : "left-[-230px]"
        } h-full md:w-full w-[230px] flex flex-col bg-light-purple p-4`}
      >
        <div className="flex justify-between mb-4">
          <h1 className="font-bold text-2xl text-white">
            <Link to="/" className="flex items-center gap-1">
              <FaListCheck className="text-3xl" />
              TodoList
            </Link>
          </h1>
          <button
            className="md:hidden font-bold text-2xl text-white cursor-pointer"
            onClick={() => {
              set_openMenu(false);
            }}
          >
            <IoClose />
          </button>
        </div>
        <ul className="relative overflow-auto grow text-white text-lg flex flex-col">
         
            <hr
              className="absolute top-0 left-0 h-8 w-px border-none bg-[#dfdfdfab] transition-top duration-300"
              style={{
                top: `${(activeLink-1) * 30 + (activeLink-1) * 10}px`,
              }}
            />
       
          <li className="py-0.5 px-3 capitalize mb-1 flex justify-between items-center">
            <Link
              to={searchParams.get("todo") ? `/draft?todo=${searchParams.get("todo")}` : "/draft"}
              className="relative transition-left duration-300 left-0 hover:left-0.5 flex items-center gap-1"
            >
              <RiDraftLine />
              draft tasks
            </Link>
            {
              number_draftedTodo_notSeen ?
                <span className="w-[20px] h-[20px] flex justify-center items-center rounded-full bg-white text-light-purple text-[12px] font-bold">{number_draftedTodo_notSeen}</span>:null
            }
          </li>
          <li className="py-1 px-3 capitalize mb-1">
            <Link
              to={searchParams.get("todo") ? `/important?todo=${searchParams.get("todo")}` : "/important"}
              className="relative transition-left duration-300 left-0 hover:left-0.5 flex items-center gap-1"
            >
              <FaRegStar />
              important tasks
            </Link>
          </li>
          <li className="py-1 px-3 capitalize mb-1">
            <Link
              to={searchParams.get("todo") ? `/done?todo=${searchParams.get("todo")}` : "/done"}
              className="relative transition-left duration-300 left-0 hover:left-0.5 flex items-center gap-1"
            >
              <GoChecklist />
              done tasks
            </Link>
          </li>
          <li className="py-1 px-3 capitalize mb-1">
            <Link
              to="/add"
              className="relative transition-left duration-300 left-0 hover:left-0.5 flex items-center gap-1"
            >
              <MdFormatListBulletedAdd />
              add new task
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
