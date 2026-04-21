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

      if (!resp.ok) {
        throw new Error("Errore nella risposta del server");
      }

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

      if (!resp.ok) {
        throw new Error("Errore nella risposta del server");
      }

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

  // DELETE MULTIPLE TASKS

  async function removeMultipleTasks(ids) {
    try {
      const requests = ids.map((id) => {
        return fetch(`${import.meta.env.VITE_BACKEND_TASKLIST_URL}/${id}`, {
          method: "DELETE",
        });
      });

      const results = await Promise.allSettled(requests);

      const successfulIds = results
        .map((result, index) => {
          if (result.status === "fulfilled" && result.value.ok) {
            return ids[index];
          }
          return null;
        })
        .filter((id) => id !== null);

      const failedIds = results
        .map((result, index) => {
          if (result.status === "rejected" || !result.value?.ok) {
            return ids[index];
          }
          return null;
        })
        .filter((id) => id !== null);

      if (successfulIds.length > 0) {
        setTasks((prev) =>
          prev.filter((task) => !successfulIds.includes(task.id)),
        );
      }

      if (failedIds.length > 0) {
        throw new Error(
          `I seguenti id non sono stati eliminati: ${failedIds.join(", ")}`,
        );
      }
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }

  //PUT
  async function updateTask(id, taskData) {
    try {
      const resp = await fetch(
        `${import.meta.env.VITE_BACKEND_TASKLIST_URL}/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(taskData),
        },
      );

      if (!resp.ok) {
        throw new Error("Errore nella risposta del server");
      }

      const data = await resp.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      setTasks((prev) =>
        prev.map((task) => (task.id === Number(id) ? data.task : task)),
      );
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }

  return { tasks, addTask, removeTask, updateTask, removeMultipleTasks };
}
