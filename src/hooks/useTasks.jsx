import { useEffect, useReducer } from "react";
import tasksReducer, { initialTasksState } from "../functions/tasksReducer";

export default function useTasks() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasksState);

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
      console.error(error.message);
      return [];
    }
  }

  useEffect(() => {
    getTasks().then((data) => {
      dispatch({ type: "LOAD_TASKS", payload: data });
    });
  }, []);

  // POST
  async function addTask(taskData) {
    try {
      const normalizedTitle = taskData.title.trim().toLowerCase();

      const alreadyExists = tasks.some(
        (t) => t.title.trim().toLowerCase() === normalizedTitle,
      );

      if (alreadyExists) {
        throw new Error("Task già esistente");
      }

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

      dispatch({ type: "ADD_TASK", payload: data.task });
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

      dispatch({ type: "REMOVE_TASK", payload: Number(id) });
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
        dispatch({
          type: "REMOVE_MULTIPLE_TASKS",
          payload: successfulIds,
        });
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

  // PUT
  async function updateTask(id, taskData) {
    try {
      const normalizedTitle = taskData.title.trim().toLowerCase();

      const alreadyExists = tasks.some(
        (t) =>
          t.id !== Number(id) &&
          t.title.trim().toLowerCase() === normalizedTitle,
      );

      if (alreadyExists) {
        throw new Error("Task già esistente");
      }

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

      dispatch({ type: "UPDATE_TASK", payload: data.task });
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }

  return { tasks, addTask, removeTask, updateTask, removeMultipleTasks };
}
