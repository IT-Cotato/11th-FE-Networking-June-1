import { http, HttpResponse, delay } from "msw";

interface Project {
  id: number;
  name: string;
}

interface User {
  id: number;
  name: string;
}

interface Task {
  id: number;
  projectId: number;
  title: string;
  status: string;
  assigneeId: number;
}

// --- Mock 데이터베이스 ---
const projects: Project[] = [
  { id: 1, name: "리액트 컴포넌트화" },
  { id: 2, name: "파트별 네트워킹 4회차" },
];

const users: User[] = [
  { id: 101, name: "김민아" },
  { id: 102, name: "류민주" },
  { id: 103, name: "송승희" },
  { id: 104, name: "안수이" },
  { id: 105, name: "전시원" },
  { id: 106, name: "조영서" },
  { id: 107, name: "한정현" },
];

const tasks: Task[] = [
  {
    id: 1,
    projectId: 1,
    title: "컴포넌트 구조 분석",
    status: "Done",
    assigneeId: 101,
  },
  {
    id: 2,
    projectId: 1,
    title: "커스텀 훅 분리",
    status: "In Progress",
    assigneeId: 102,
  },
  {
    id: 3,
    projectId: 1,
    title: "전역 상태관리 적용",
    status: "To Do",
    assigneeId: 103,
  },
  {
    id: 4,
    projectId: 2,
    title: "메인 페이지 UI 디자인",
    status: "Done",
    assigneeId: 104,
  },
  {
    id: 5,
    projectId: 2,
    title: "API 연동",
    status: "To Do",
    assigneeId: 105,
  },
  {
    id: 6,
    projectId: 2,
    title: "README.md 작성",
    status: "In Progress",
    assigneeId: 106,
  },
  {
    id: 7,
    projectId: 2,
    title: "패키지 관리",
    status: "To Do",
    assigneeId: 107,
  },
];
let nextTaskId = 8;

// --- API 핸들러  ---
export const handlers = [
  http.get("/api/projects", async () => {
    await delay(500);
    return HttpResponse.json(projects);
  }),

  http.get("/api/users", async () => {
    await delay(300);
    return HttpResponse.json(users);
  }),

  http.get("/api/tasks", async ({ request }) => {
    const url = new URL(request.url);
    const projectId = url.searchParams.get("projectId");
    if (!projectId) {
      return HttpResponse.json(
        { message: "projectId가 필요합니다." },
        { status: 400 }
      );
    }
    const projectTasks = tasks.filter(
      (task) => task.projectId === parseInt(projectId)
    );
    await delay(800);
    return HttpResponse.json(projectTasks);
  }),

  http.post("/api/tasks", async ({ request }) => {
    const newTaskInfo = (await request.json()) as Omit<Task, "id">;

    const newTask: Task = { ...newTaskInfo, id: nextTaskId++ };
    tasks.push(newTask);

    await delay(400);
    return HttpResponse.json(newTask, { status: 201 });
  }),

  http.patch("/api/tasks/:taskId", async ({ request, params }) => {
    const { taskId } = params;

    if (typeof taskId !== "string") {
      return HttpResponse.json(
        { message: "잘못된 taskId입니다." },
        { status: 400 }
      );
    }

    const { status } = (await request.json()) as { status: string };

    const taskIndex = tasks.findIndex((t) => t.id === parseInt(taskId));
    if (taskIndex === -1) {
      return HttpResponse.json(
        { message: "작업을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    tasks[taskIndex].status = status;
    await delay(300);
    return HttpResponse.json(tasks[taskIndex]);
  }),
];
