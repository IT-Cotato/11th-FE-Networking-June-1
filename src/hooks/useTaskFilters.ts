import { useState } from "react";
import type { StatusFilter } from "../types";

/**
 * 할 일 목록 필터(상태, 검색어)를 관리하는 커스텀 훅
 * - 상태 필터: "All", "To Do", "In Progress", "Done"
 * - 검색 필터: 제목 기반 텍스트 검색
 */
export const useTaskFilters = () => {
  const [filterStatus, setFilterStatus] = useState<StatusFilter>("All"); // 상태 필터
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 필터

  return {
    filterStatus,
    setFilterStatus,
    searchTerm,
    setSearchTerm,
  };
};
