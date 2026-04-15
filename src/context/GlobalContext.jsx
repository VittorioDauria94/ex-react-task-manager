import { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext();

function GlobalProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  async function getTasks() {
    try {
      const resp = await fetch(import.meta.env.VITE_BACKEND_TASKLIST_URL);
      if (!resp.ok) {
        throw new Error("Errore nella risposta del server");
      }
      const data = await resp.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getTasks().then((data) => setTasks(data));
  }, []);

  console.log(tasks);
  

  return (
    <GlobalContext.Provider value={{ tasks, setTasks }}>
      {children}
    </GlobalContext.Provider>
  );
}

function useGlobal() {
  const context = useContext(GlobalContext);
  return context;
}

export { GlobalProvider, useGlobal };
