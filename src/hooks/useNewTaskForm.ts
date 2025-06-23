import { useState } from "react";

export const useNewTaskForm = () => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskAssignee, setNewTaskAssignee] = useState("");

  const resetForm = () => {
    setNewTaskTitle("");
  };

  return {
    newTaskTitle,
    setNewTaskTitle,
    newTaskAssignee,
    setNewTaskAssignee,
    resetForm,
  };
};
