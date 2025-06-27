import React from 'react';
import type { ThemeName } from '../hooks/useTheme';
import { themes } from '../hooks/useTheme';

interface User {
  id: number;
  name: string;
}

interface Props {
  users: User[];
  newTaskTitle: string;
  setNewTaskTitle: React.Dispatch<React.SetStateAction<string>>;
  newTaskAssignee: string;
  setNewTaskAssignee: React.Dispatch<React.SetStateAction<string>>;
  isLoadingUsers: boolean;
  isLoading: boolean;
  handleAddTask: (e: React.FormEvent<HTMLFormElement>) => void;
  themeName: ThemeName;
}

export default function TaskForm({
  users,
  newTaskTitle,
  setNewTaskTitle,
  newTaskAssignee,
  setNewTaskAssignee,
  isLoadingUsers,
  isLoading,
  handleAddTask,
  themeName,
}: Props) {
  const currentTheme = themes[themeName];
  return (
    <div
      style={{
        backgroundColor: currentTheme.componentBg,
        padding: '20px',
        borderRadius: '12px',
        boxShadow: currentTheme.cardShadow,
        border: `1px solid ${currentTheme.border}`,
        marginBottom: 24,
      }}
    >
      <form
        onSubmit={handleAddTask}
        style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}
      >
        <input
          type="text"
          value={newTaskTitle}
          onChange={e => setNewTaskTitle(e.target.value)}
          placeholder="할 일 제목을 입력하세요..."
          style={{
            flex: '1',
            minWidth: '200px',
            padding: '10px 12px',
            border: `1px solid ${currentTheme.border}`,
            borderRadius: '8px',
            fontSize: '14px',
            backgroundColor: currentTheme.inputBg,
            color: currentTheme.text,
            outline: 'none',
          }}
        />
        <select
          value={newTaskAssignee}
          onChange={e => setNewTaskAssignee(e.target.value)}
          style={{
            padding: '10px 12px',
            border: `1px solid ${currentTheme.border}`,
            borderRadius: '8px',
            fontSize: '14px',
            backgroundColor: currentTheme.inputBg,
            color: currentTheme.text,
            minWidth: '140px',
            cursor: 'pointer',
            outline: 'none',
          }}
          disabled={isLoadingUsers}
        >
          <option value="">담당자 선택</option>
          {users.map(u => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={isLoading}
          style={{
            padding: '10px 20px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            background: isLoading ? '#9ca3af' : currentTheme.buttonBg,
            color: currentTheme.buttonText,
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            opacity: isLoading ? 0.6 : 1,
          }}
        >
          {isLoading ? '추가 중...' : '추가'}
        </button>
      </form>
    </div>
  );
}
