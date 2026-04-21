import { useEffect, useMemo, useRef, useState } from "react";
import Modal from "./Modal";
import { validateTaskTitle } from "../functions/titleValidation";

export default function EditTaskModal({ show, onClose, task, onSave }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);
  const [error, setError] = useState("");
  const [isTitleTouched, setIsTitleTouched] = useState(false);
  const editFormRef = useRef();

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
    setIsTitleTouched(false);
    setError("");
  }, [task]);

  const isTitleValid = useMemo(() => validateTaskTitle(title), [title]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!isTitleValid) {
      setError("Tutti i campi devono essere compilati correttamente.");
      return;
    }

    setError("");

    await onSave({
      title,
      description,
      status,
    });
  }

  return (
    <Modal
      title={"Modifica Task"}
      show={show}
      onClose={onClose}
      confirmText="Salva"
      onConfirm={() => editFormRef.current?.requestSubmit()}
      btnColor={"btn-primary"}
      content={
        <form ref={editFormRef} onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="form-label fw-semibold">
              Titolo
            </label>
            <input
              type="text"
              className={`form-control ${
                isTitleTouched && !isTitleValid ? "is-invalid" : ""
              }`}
              id="title"
              name="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setIsTitleTouched(true);
              }}
              placeholder="Inserisci il titolo del task"
            />
            {isTitleTouched && !isTitleValid && (
              <div className="invalid-feedback d-block">
                Il titolo non può essere vuoto e non può contenere simboli
                speciali.
              </div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="form-label fw-semibold">
              Descrizione
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Aggiungi una breve descrizione"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="status" className="form-label fw-semibold">
              Stato
            </label>
            <select
              className="form-select"
              id="status"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="To do">To do</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>
          </div>

          {error && <div className="alert alert-danger py-2">{error}</div>}
        </form>
      }
    />
  );
}
