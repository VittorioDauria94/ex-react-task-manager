import { useEffect, useState } from "react";

export default function useTasks() {
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
      return [];
    }
  }

  useEffect(() => {
    getTasks().then((data) => setTasks(data));
  }, []);

  function addTask() {}

  function removeTask() {}

  function updateTask() {}

  console.log(tasks);

  return { tasks, addTask, removeTask, updateTask };
}
