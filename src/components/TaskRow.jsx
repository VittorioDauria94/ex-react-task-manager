import { memo } from "react";

export default memo(function TaskRow({ task }) {
  function getStatusClass(status) {
    if (status === "To do") return "table-danger";
    if (status === "Doing") return "table-warning";
    if (status === "Done") return "table-success";
    return "";
  }

  return (
    <tr>
      <td className="fw-medium">{task.title}</td>
      <td className={`${getStatusClass(task.status)} fw-semibold`}>
        {task.status}
      </td>
      <td className="text-muted">
        {new Date(task.createdAt).toLocaleDateString("it-IT")}
      </td>
    </tr>
  );
});
