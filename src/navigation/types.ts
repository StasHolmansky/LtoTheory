import type { SignCategoryId } from '../content/signs';

export type QuizMode = 'learn' | 'exam' | 'mistakes';

export type RootStackParamList = {
  Home: undefined;
  Quiz: { mode: QuizMode; ids: number[]; startId?: number };
  Result: { mode: QuizMode; correct: number; total: number };
  Settings: undefined;
  Feedback: undefined;
  SignCategories: undefined;
  SignList: { categoryId: SignCategoryId };
};
