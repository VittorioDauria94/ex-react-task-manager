import { memo } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

export default memo(function TaskRow({ task, checked, onToggle }) {
  function getStatusClass(status) {
    if (status === "To do") return "table-danger";
    if (status === "Doing") return "table-warning";
    if (status === "Done") return "table-success";
    return "";
  }

  return (
    <tr>
      <td className="fw-medium">
        <div className="form-check">
          <input
            type="checkbox"
            name="selectTask"
            id={`selectTask-${task.id}`}
            className="form-check-input"
            checked={checked}
            onChange={() => onToggle(task.id)}
          />
          <Link
            to={`/task/${task.id}`}
            className="text-decoration-none link-body-emphasis"
          >
            {task.title}
          </Link>
        </div>
      </td>
      <td className={`${getStatusClass(task.status)} fw-semibold`}>
        {task.status}
      </td>
      <td className="text-muted">
        {dayjs(task.createdAt).format("DD/MM/YYYY")}
      </td>
    </tr>
  );
});
