import { Link, useNavigate, useParams } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext";
import Modal from "../components/Modal";
import { useState } from "react";
import EditTaskModal from "../components/EditTaskModal";
import dayjs from "dayjs";

export default function TaskDetails() {
  const { id } = useParams();
  const { tasks, removeTask, updateTask } = useGlobal();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const task = tasks.find((task) => task.id === Number(id));

  function getStatusClass(status) {
    if (status === "To do") return "text-bg-danger";
    if (status === "Doing") return "text-bg-warning";
    if (status === "Done") return "text-bg-success";
    return "text-bg-secondary";
  }

  async function handleRemove(taskId) {
    try {
      await removeTask(taskId);
      setShowModal(false);
      alert("Task eliminata correttamente");
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleSave(updatedTask) {
    try {
      await updateTask(task.id, updatedTask);
      alert("Task modificata correttamente");
      setShowEditModal(false);
    } catch (error) {
      alert(error.message);
    }
  }

  if (!task) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning shadow-sm rounded-4">
          Task non trovata.
        </div>

        <Link to="/" className="btn btn-outline-primary rounded-pill px-4">
          Torna alla lista
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            <div className="bg-dark text-white p-4">
              <p className="text-white-50 mb-2">Dettaglio Task</p>
              <h1 className="h3 mb-0">{task.title}</h1>
            </div>

            <div className="card-body p-4">
              <div className="d-flex flex-wrap gap-2 mb-4">
                <span
                  className={`badge ${getStatusClass(task.status)} px-3 py-2`}
                >
                  {task.status}
                </span>
                <span className="badge text-bg-light px-3 py-2">
                  {dayjs(task.createdAt).format("DD/MM/YYYY")}
                </span>
              </div>

              <div className="mb-4">
                <h2 className="h5 mb-3">Descrizione</h2>
                <p className="text-muted mb-0">
                  {task.description || "Nessuna descrizione disponibile."}
                </p>
              </div>

              <div className="d-flex flex-wrap gap-3">
                <Link
                  to="/"
                  className="btn btn-outline-secondary rounded-pill px-4"
                >
                  Torna alla lista
                </Link>

                <button
                  className="btn btn-primary rounded-pill px-4"
                  onClick={() => setShowEditModal(true)}
                >
                  Modifica Task
                </button>

                <button
                  className="btn btn-danger rounded-pill px-4"
                  onClick={() => setShowModal(true)}
                >
                  Elimina Task
                </button>

                <Modal
                  title="Elimina Task"
                  content="Sei sicuro di voler eliminare questa task?"
                  show={showModal}
                  onClose={() => setShowModal(false)}
                  onConfirm={() => handleRemove(task.id)}
                  confirmText="Conferma"
                  btnColor={"btn-danger"}
                />

                <EditTaskModal
                  task={task}
                  show={showEditModal}
                  onClose={() => setShowEditModal(false)}
                  onSave={handleSave}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
