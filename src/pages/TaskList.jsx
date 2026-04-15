import { useGlobal } from "../context/GlobalContext";
import TaskRow from "../components/TaskRow";

export default function TaskList() {
  const { tasks } = useGlobal();

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            <div className="card-body p-0">
              <div className="bg-dark text-white p-4">
                <h1 className="h3 mb-1">Lista dei Task</h1>
                <p className="mb-0 text-white-50">
                  Tieni traccia delle attività e del loro stato
                </p>
              </div>

              <div className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h2 className="h5 mb-0">Panoramica</h2>
                  <span className="badge text-bg-primary rounded-pill px-3 py-2">
                    {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
                  </span>
                </div>

                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th scope="col" className="fw-semibold py-3">
                          Nome
                        </th>
                        <th scope="col" className="fw-semibold py-3">
                          Stato
                        </th>
                        <th scope="col" className="fw-semibold py-3">
                          Data di Creazione
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {tasks.length > 0 ? (
                        tasks.map((task) => (
                          <TaskRow key={task.id} task={task} />
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="3"
                            className="text-center py-5 text-muted"
                          >
                            Nessun task presente
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
