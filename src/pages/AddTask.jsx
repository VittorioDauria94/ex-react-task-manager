import { useMemo, useRef, useState } from "react";
import { useGlobal } from "../context/GlobalContext";

const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

export default function AddTask() {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [isTitleTouched, setIsTitleTouched] = useState(false);
  const descriptionRef = useRef();
  const statusRef = useRef();
  const { addTask } = useGlobal();

  const isTitleValid = useMemo(() => {
    const hasSpecialSymbols = title
      .split("")
      .some((char) => symbols.includes(char));

    return title.trim().length > 0 && !hasSpecialSymbols;
  }, [title]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isTitleValid) {
      setError("Tutti i campi devono essere compilati correttamente.");
      return;
    }

    const newTask = {
      title,
      description: descriptionRef.current.value,
      status: statusRef.current.value,
    };

    try {
      await addTask(newTask);
      alert("Task aggiunta correttamente");

      setError("");
      setTitle("");
      setIsTitleTouched(false);
      descriptionRef.current.value = "";
      statusRef.current.value = "To do";
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            <div className="bg-dark text-white p-4">
              <p className="text-white-50 mb-2">Nuova Task</p>
              <h1 className="h3 mb-0">Aggiungi Task</h1>
            </div>

            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
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
                  <label
                    htmlFor="description"
                    className="form-label fw-semibold"
                  >
                    Descrizione
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    ref={descriptionRef}
                    rows={4}
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
                    ref={statusRef}
                    defaultValue="To do"
                  >
                    <option value="To do">To do</option>
                    <option value="Doing">Doing</option>
                    <option value="Done">Done</option>
                  </select>
                </div>

                {error && (
                  <div className="alert alert-danger py-2">{error}</div>
                )}

                <div className="d-flex gap-3">
                  <button
                    type="submit"
                    className="btn btn-primary rounded-pill px-4"
                  >
                    Aggiungi Task
                  </button>
                  <button
                    type="reset"
                    className="btn btn-outline-secondary rounded-pill px-4"
                    onClick={() => {
                      setTitle("");
                      setError("");
                      setIsTitleTouched(false);
                      descriptionRef.current.value = "";
                      statusRef.current.value = "To do";
                    }}
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
