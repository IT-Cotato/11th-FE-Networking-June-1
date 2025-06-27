import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Dashboard from "@/pages/DashBoard";

// 1. QueryClient 인스턴스 생성
const queryClient = new QueryClient();

const App = () => {
  return (
    // 2. Provider로 감싸기
    <QueryClientProvider client={queryClient}>
      <Dashboard />
    </QueryClientProvider>
  );
};

export default App;