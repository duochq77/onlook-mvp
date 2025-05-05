// src/utils/timeUtils.ts

export const getCurrentTimestamp = (): string => {
    return new Date().toISOString();
  };
  
  export const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };
  
  export const getElapsedTimeInSeconds = (start: Date, end: Date): number => {
    return Math.floor((end.getTime() - start.getTime()) / 1000);
  };
  