import { useState } from "react";
import type { StatusFilter } from "../types";
import TaskItem from "./TaskItem";
import { useTheme } from "../hooks/useTheme";

export default function TaskList() {
  const currentTheme = useTheme();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<StatusFilter>("All");

  return (
    <div
      className="p-5 rounded-xl"
      style={{
        backgroundColor: currentTheme.componentBg,
        boxShadow: currentTheme.cardShadow,
        border: `1px solid ${currentTheme.border}`,
      }}
    >
      <div className="flex justify-between mb-5 items-center flex-wrap gap-3">
        <h2
          className="font-semibold text-lg m-0"
          style={{ color: currentTheme.text }}
        >
          할 일 목록
        </h2>
        <div className="flex gap-2 flex-wrap">
          <input
            type="text"
            placeholder="검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 min-w-[160px] text-sm rounded-lg outline-none transition-colors"
            style={{
              border: `1px solid ${currentTheme.border}`,
              backgroundColor: currentTheme.inputBg,
              color: currentTheme.text,
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#8b5cf6";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = currentTheme.border;
            }}
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as StatusFilter)}
            className="px-3 py-2 text-sm min-w-[100px] rounded-lg cursor-pointer outline-none"
            style={{
              border: `1px solid ${currentTheme.border}`,
              backgroundColor: currentTheme.inputBg,
              color: currentTheme.text,
            }}
          >
            <option value="All">전체</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
      </div>

      <TaskItem filterStatus={filterStatus} searchTerm={searchTerm} />
    </div>
  );
}
