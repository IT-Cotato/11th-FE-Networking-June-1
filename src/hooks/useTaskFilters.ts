import { useState } from "react";
import type { StatusFilter } from "../types";

export const useTaskFilters = () => {
  const [filterStatus, setFilterStatus] = useState<StatusFilter>("All");
  const [searchTerm, setSearchTerm] = useState("");

  return {
    filterStatus,
    setFilterStatus,
    searchTerm,
    setSearchTerm,
  };
};
