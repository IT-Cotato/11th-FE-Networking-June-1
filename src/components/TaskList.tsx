import React from 'react';
import type { ThemeName } from '../hooks/useTheme';
import { themes } from '../hooks/useTheme';

type Status = 'To Do' | 'In Progress' | 'Done';
type StatusFilter = 'All' | Status;

interface User {
  id: number;
  name: string;
}

interface Task {
  id: number;
  projectId: number;
  title: string;
  status: Status;
  assigneeId: number;
}

interface Props {
  users: User[];
  tasks: Task[];
  filterStatus: StatusFilter;
  setFilterStatus: React.Dispatch<React.SetStateAction<StatusFilter>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  isLoadingTasks: boolean;
  handleStatusChange: (taskId: number, newStatus: Status) => void;
  themeName: ThemeName;
}

export default function TaskList({
  users,
  tasks,
  filterStatus,
  setFilterStatus,
  searchTerm,
  setSearchTerm,
  isLoadingTasks,
  handleStatusChange,
  themeName,
}: Props) {
  const currentTheme = themes[themeName];
  const filteredTasks = React.useMemo(() => {
    return tasks
      .filter(task => filterStatus === 'All' || task.status === filterStatus)
      .filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
  }, [tasks, filterStatus, searchTerm]);

  return (
    <div
      style={{
        backgroundColor: currentTheme.componentBg,
        padding: '20px',
        borderRadius: '12px',
        boxShadow: currentTheme.cardShadow,
        border: `1px solid ${currentTheme.border}`,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '20px',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: '18px',
            fontWeight: '600',
            color: currentTheme.text,
          }}
        >
          할 일 목록
        </h2>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="검색..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{
              padding: '8px 12px',
              border: `1px solid ${currentTheme.border}`,
              borderRadius: '8px',
              fontSize: '14px',
              backgroundColor: currentTheme.inputBg,
              color: currentTheme.text,
              minWidth: '160px',
              outline: 'none',
            }}
          />
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value as StatusFilter)}
            style={{
              padding: '8px 12px',
              border: `1px solid ${currentTheme.border}`,
              borderRadius: '8px',
              fontSize: '14px',
              backgroundColor: currentTheme.inputBg,
              color: currentTheme.text,
              minWidth: '100px',
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            <option value="All">전체</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
      </div>

      {isLoadingTasks ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          할 일을 불러오는 중...
        </div>
      ) : filteredTasks.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '40px',
            color: '#6b7280',
            fontSize: '14px',
          }}
        >
          할 일이 없습니다
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {filteredTasks.map(task => (
            <div
              key={task.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
                borderRadius: '8px',
                border: `1px solid ${currentTheme.border}`,
                backgroundColor: currentTheme.componentBg,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = currentTheme.hoverBg;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor =
                  currentTheme.componentBg;
              }}
            >
              <div style={{ flex: 1 }}>
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: '400',
                    color: currentTheme.text,
                  }}
                >
                  {task.title}
                </span>
              </div>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
              >
                <span
                  style={{
                    padding: '4px 8px',
                    backgroundColor: currentTheme.hoverBg,
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '400',
                    color: currentTheme.text,
                    border: `1px solid ${currentTheme.border}`,
                  }}
                >
                  {users.find(u => u.id === task.assigneeId)?.name || '미지정'}
                </span>
                <select
                  value={task.status}
                  onChange={e =>
                    handleStatusChange(task.id, e.target.value as Status)
                  }
                  style={{
                    padding: '6px 8px',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    backgroundColor: currentTheme.statusColors[task.status],
                    color: '#fff',
                    minWidth: '100px',
                  }}
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
