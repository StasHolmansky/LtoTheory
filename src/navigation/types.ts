export type QuizMode = 'learn' | 'exam';

export type RootStackParamList = {
  Home: undefined;
  Quiz: { mode: QuizMode; ids: number[]; startId?: number };
  Result: { mode: QuizMode; correct: number; total: number };
  Settings: undefined;
  Feedback: undefined;
};
