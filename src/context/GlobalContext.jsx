import { createContext, useContext } from "react";
import useTasks from "../hooks/useTasks";

const GlobalContext = createContext();

function GlobalProvider({ children }) {
  const { tasks, addTask, removeTask, updateTask, removeMultipleTasks } = useTasks();

  return (
    <GlobalContext.Provider value={{ tasks, addTask, removeTask, updateTask, removeMultipleTasks }}>
      {children}
    </GlobalContext.Provider>
  );
}

function useGlobal() {
  const context = useContext(GlobalContext);
  return context;
}

export { GlobalProvider, useGlobal };
