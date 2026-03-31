import React from "react";
import "../assets/css/StatusBadge.css"; // Nhúng file CSS mới

function StatusBadge({ status }) {
  let badgeClass = "badge-default";
  let badgeText = status;

  // Xử lý màu và text hiển thị theo từng trạng thái
  switch (status) {
    case "available":
      badgeClass = "badge-success";
      badgeText = "Có sẵn";
      break;
    case "deposited":
      badgeClass = "badge-warning";
      badgeText = "Đã cọc";
      break;
    case "sold":
      badgeClass = "badge-danger";
      badgeText = "Đã bán";
      break;
    default:
      badgeText = "Không rõ";
      break;
  }

  return <span className={`oc-status-badge ${badgeClass}`}>{badgeText}</span>;
}

export default StatusBadge;
