import { useGlobal } from "../context/GlobalContext";
import TaskRow from "../components/TaskRow";
import { useCallback, useMemo, useState } from "react";
import { debounce } from "../functions/debounce";

export default function TaskList() {
  const { tasks } = useGlobal();
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = useCallback(
    debounce((value) => {
      setSearchQuery(value.trim().toLowerCase());
    }, 500),
    [],
  );

  const handleChange = (e) => {
    handleSearch(e.target.value);
  };

  const sortedTasks = useMemo(() => {
    const filteredTasks = tasks.filter((t) => {
      if (searchQuery === "") return true;
      return t.title.toLowerCase().includes(searchQuery);
    });

    const statusOrder = {
      "To do": 0,
      Doing: 1,
      Done: 2,
    };

    return filteredTasks.sort((a, b) => {
      if (sortBy === "title") {
        return sortOrder === 1
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }

      if (sortBy === "status") {
        return sortOrder === 1
          ? statusOrder[a.status] - statusOrder[b.status]
          : statusOrder[b.status] - statusOrder[a.status];
      }

      if (sortBy === "createdAt") {
        return sortOrder === 1
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }

      return 0;
    });
  }, [tasks, sortBy, sortOrder, searchQuery]);

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
                <form
                  className="d-flex gap-2 mb-4"
                  role="search"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    className="form-control rounded-pill"
                    type="search"
                    placeholder="Cerca la task..."
                    aria-label="Search"
                    onChange={handleChange}
                  />
                </form>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h2 className="h5 mb-0">Panoramica</h2>
                  <span className="badge text-bg-primary rounded-pill px-3 py-2">
                    {sortedTasks.length}{" "}
                    {sortedTasks.length === 1 ? "task" : "tasks"}
                  </span>
                </div>

                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th scope="col" className="py-3">
                          <button
                            type="button"
                            className="btn btn-link text-decoration-none text-dark p-0 border-0 shadow-none fw-semibold
                          "
                            onClick={() => {
                              if (sortBy === "title") {
                                setSortOrder((prev) => (prev === 1 ? -1 : 1));
                              } else {
                                setSortBy("title");
                                setSortOrder(1);
                              }
                            }}
                          >
                            Nome
                            {sortBy === "title"
                              ? sortOrder === 1
                                ? " ⮝"
                                : " ⮟"
                              : " ↕"}
                          </button>
                        </th>
                        <th scope="col" className="fw-semibold py-3">
                          <button
                            type="button"
                            className="btn btn-link text-decoration-none text-dark p-0 border-0 shadow-none fw-semibold"
                            onClick={() => {
                              if (sortBy === "status") {
                                setSortOrder((prev) => (prev === 1 ? -1 : 1));
                              } else {
                                setSortBy("status");
                                setSortOrder(1);
                              }
                            }}
                          >
                            Stato
                            {sortBy === "status"
                              ? sortOrder === 1
                                ? " ⮝"
                                : " ⮟"
                              : " ↕"}
                          </button>
                        </th>
                        <th scope="col" className="fw-semibold py-3">
                          <button
                            type="button"
                            className="btn btn-link text-decoration-none text-dark p-0 border-0 shadow-none fw-semibold"
                            onClick={() => {
                              if (sortBy === "createdAt") {
                                setSortOrder((prev) => (prev === 1 ? -1 : 1));
                              } else {
                                setSortBy("createdAt");
                                setSortOrder(1);
                              }
                            }}
                          >
                            Data di Creazione
                            {sortBy === "createdAt"
                              ? sortOrder === 1
                                ? " ⮝"
                                : " ⮟"
                              : " ↕"}
                          </button>
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {sortedTasks.length > 0 ? (
                        sortedTasks.map((task) => (
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
