import { useEffect } from "react";
import { useProjectStore } from "../stores/useProjectStore";
import type { Project } from "../types";

/**
 * 프로젝트 목록을 서버에서 불러와 전역 상태에 저장하는 커스텀 훅
 * 앱 초기 진입 시 1회 실행됨
 */
export const useProjects = () => {
  const { setProjects, setSelectedProjectId, setIsLoading, setError } =
    useProjectStore();

  useEffect(() => {
    setIsLoading(true); // 로딩 시작

    fetch("/api/projects")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data: Project[]) => {
        setProjects(data); // 프로젝트 목록 저장

        // 선택된 프로젝트 ID가 없을 경우 첫 번째 ID로 설정
        if (data.length > 0) {
          setSelectedProjectId((prev) => prev ?? data[0].id);
        }

        setError(null); // 에러 초기화
      })
      .catch((err) => {
        setError(`프로젝트 로딩 실패: ${err.message}`);
      })
      .finally(() => {
        setIsLoading(false); // 로딩 종료
      });
  }, [setProjects, setSelectedProjectId, setIsLoading, setError]);
};
