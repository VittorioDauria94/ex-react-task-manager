import { useEffect, useState } from "react";

export default function useTasks() {
  const [tasks, setTasks] = useState([]);

  // GET
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

  // POST
  async function addTask(taskData) {
    try {
      const resp = await fetch(import.meta.env.VITE_BACKEND_TASKLIST_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      const data = await resp.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      setTasks((prev) => [...prev, data.task]);
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }

  // DELETE
  async function removeTask(id) {
    try {
      const resp = await fetch(
        `${import.meta.env.VITE_BACKEND_TASKLIST_URL}/${id}`,
        {
          method: "DELETE",
        },
      );

      const data = await resp.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      setTasks((prev) => prev.filter((task) => task.id !== Number(id)));
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }

  function updateTask() {}

  console.log(tasks);

  return { tasks, addTask, removeTask, updateTask };
}
