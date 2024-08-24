import { IoSearch } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import { useSearchParams } from 'react-router-dom';
import styles from "./../../css/header.module.css";
export default function Header({ set_openMenu , location }){
  const [searchParams, set_searchParams] = useSearchParams();
  const title = location.pathname.slice(1).split("-").join(" ");
  let date_today = new Date();
  date_today = date_today.toLocaleDateString("en-US",{
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  // handle search input
  const handle_searchInput = (e)=>{
    if(e.target.value.length!=0){
      set_searchParams({'todo':e.target.value})
    }else{
      set_searchParams({})
    }
  }
  
  return (
    <>
      <header
        className={`${styles.header} sticky top-0 z-[50] flex justify-between p-4 md:rounded-b-md`}
      >
        <button
          onClick={() => set_openMenu(true)}
          className="block md:hidden text-light-purple"
        >
          <IoMenu className="text-3xl" />
        </button>
        <div
          className="ms-auto w-4/12 min-w-[200px] md:min-w-[400px] bg-light-purple rounded-lg p-0.5 flex">
          <input
            onChange={(e)=>handle_searchInput(e)}
            type="search"
            value={searchParams.get("todo")||""}
            name="search-todo"
            placeholder="search todos"
            className="w-9/12 grow outline-none rounded-lg px-3 text-small text-[#533a9b] placeholder:italic placeholder:text-small placeholder:text-[#533a9b] "
          />
          <button className="p-2">
            <IoSearch className="text-white" />
          </button>
        </div>
      </header>
      <div className="flex flex-col md:flex-row justify-between px-4 py-2 mt-3" >
        <h2 className="text-xl capitalize font-medium text-lg py-1 mb-2">{title.length==0 ? "Todo list" : title}</h2>
        <span className="py-1">{date_today}</span>
      </div>
    </>
  );
}
