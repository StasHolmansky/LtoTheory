import bank from '../../questions.json';

export type QuestionOption = {
  key: string;
  text: string;
};

export type Question = {
  id: number;
  question: string;
  options: QuestionOption[];
  answer: string;
};

export const questions: Question[] = bank.questions;
