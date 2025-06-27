export const getErrorMessage = (
  error: unknown,
  context?: string
): string => {
  const baseMessage =
    error instanceof Error ? error.message : String(error);

  return context ? `${context} 실패: ${baseMessage}` : baseMessage;
};