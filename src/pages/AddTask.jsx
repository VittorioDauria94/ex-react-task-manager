import { useMemo, useRef, useState } from "react";

const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

export default function AddTask() {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [isTitleTouched, setIsTitleTouched] = useState(false);
  const descriptionRef = useRef();
  const statusRef = useRef();

  const isTitleValid = useMemo(() => {
    const hasSpecialSymbols = title
      .split("")
      .some((char) => symbols.includes(char));

    return title.trim().length > 0 && !hasSpecialSymbols;
  }, [title]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!isTitleValid) {
      setError("Tutti i campi devono essere compilati correttamente.");
      return;
    }

    setError("");

    console.log({
      title,
      description: descriptionRef.current.value,
      status: statusRef.current.value,
    });
  }

  return (
    <>
      <div className="container py-5">
        <form onSubmit={handleSubmit}>
          <h1 className="h3 mb-1">Aggiungi Task</h1>
          <div className="my-3">
            <label htmlFor="title" className="form-label">
              Titolo
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              minLength={1}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setIsTitleTouched(true);
              }}
            />
            {isTitleTouched && !isTitleValid && (
              <p className="text-danger mt-1">
                Il titolo non può essere vuoto e non può contenere simboli
                speciali
              </p>
            )}
          </div>
          <div className="my-3">
            <label htmlFor="description" className="form-label">
              Descrizione
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              ref={descriptionRef}
              rows={3}
            />
          </div>
          <div className="my-3">
            <label htmlFor="status" className="form-label">
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

          {error && <p className="text-danger">{error}</p>}

          <button type="submit" className="btn btn-primary">
            Aggiungi Task
          </button>
        </form>
      </div>
    </>
  );
}
